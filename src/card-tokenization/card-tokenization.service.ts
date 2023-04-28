import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CardDTO } from './dto/card.dto'; 
import { CardTokenizationRepository } from './card-tokenization.repository';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ValidPKResponse, VerifyResponse, SigninResponse } from './dto/responses.dto';

@Injectable()
export class CardTokenizationService {
  constructor(
    private readonly cardTokenizationRepository: CardTokenizationRepository,
    private readonly logger:Logger = new Logger('card-tokenization-service'),
    private readonly jwtService: JwtService
  ) {}

  // Function to validate the PK token from stores
  valid_pk_token(pk_token: string): ValidPKResponse {
    if(!pk_token) return {message: 'Debe ingresar el pk del negocio como token de autorización.', validated: false};
    if(!/^pk_test_[a-zA-Z]{16}$/.test(pk_token)) return {message:'El pk de autorización del negocio ingresado no es válido.', validated: false}
    return {validated: true};
  }

  // Function to stringify the card number without the numbers in the middle for security
  stringifyCardNumber(card_number: number): string {
    const stringCardNumber = card_number.toString();
    return `${stringCardNumber.slice(0,stringCardNumber.length-10)}******${stringCardNumber.slice(-4)}`;
  }

  async signin(cardInformation: CardDTO, pk_token: string): Promise<SigninResponse>{
    try{
      this.logger.log('Starting sign in process ...');
      
      // Validate the PK from the header
      const validatedPKToken = this.valid_pk_token(pk_token);
      if(!validatedPKToken.validated) throw new UnauthorizedException(validatedPKToken.message);
       
      // Getting the tokenized card 
      const tokenized_card = this.jwtService.sign({...cardInformation});
      
      // Save the tokenized card and the pk asociated in the database
      const newRegister = await this.cardTokenizationRepository.saveTokenizedCard({tokenized_card, pk_token});
      this.logger.log(`New tokenized card saved for ${newRegister.pk_token}`);

      // Returning the tokenized card
      return {token: newRegister.tokenized_card};

    } catch(err){
      this.logger.log('Something went wrong ...');
      this.logger.log({status: err.status, message: err.message });
      throw err;
    }
  }

  async verify(tokenized_card: string, pk_token: string): Promise<VerifyResponse>{
    try {
      this.logger.log('Starting validating token...');

      // Validate the PK from the header
      const validatedPKToken = this.valid_pk_token(pk_token);
      if(!validatedPKToken.validated) throw new UnauthorizedException(validatedPKToken.message);
      
      // Validate if this tokenized card was created by the pk_token before
      const existsTokenizedCard = await this.cardTokenizationRepository.validateTokenizedCard({tokenized_card, pk_token});
      if(!existsTokenizedCard) throw new BadRequestException('El token brindado es incorrecto.');

      // Verify if the tokenized_card is valid
      const tokenized_card_decoded = this.jwtService.decode(existsTokenizedCard.tokenized_card);
      if(!tokenized_card_decoded) throw new BadRequestException('El token brindado es inválido.');
      
      // Verify if is outdated
      if(Date.now() > existsTokenizedCard.expiration ) throw new UnauthorizedException('El token ha expirado.');
      
      // Returning card information without cvv
      return {
        email: tokenized_card_decoded['email'],
        card_number: this.stringifyCardNumber(tokenized_card_decoded['card_number']),
        expiration_month: tokenized_card_decoded['expiration_month'],
        expiration_year: tokenized_card_decoded['expiration_year']
      };
    
    } catch (err) {
      this.logger.log('Something went wrong ...');
      this.logger.log({status: err.status, message: err.message });
      throw err;
    }
  }
}
