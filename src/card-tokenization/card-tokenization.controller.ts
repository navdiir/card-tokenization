import { Controller, Res,Req, Body, HttpStatus, UsePipes, ValidationPipe, HttpCode, UseFilters, Get, Post, Param, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CardTokenizationService } from './card-tokenization.service';
import { CardDTO } from './dto/card.dto';

@Controller('card-tokenization')
@UsePipes(new ValidationPipe({ transform: true, stopAtFirstError: true }))
@UseFilters(HttpExceptionFilter)
export class CardTokenizationController {
  constructor( 
    private readonly logger:Logger = new Logger(),
    private readonly cardTokenizationService: CardTokenizationService
  ) {}

  @Get('validation')
  @HttpCode(200)
  async validation(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        success:true,
        data: 'Service is running!'
      })
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('signin')
  @HttpCode(201)
  async signin(@Res() res: Response, @Req() req: Request, @Body() cardInformation: CardDTO) {
    try {
      this.logger.log('New request to signin');
      const response = await this.cardTokenizationService.signin(cardInformation, req.headers.authorization?.split(' ')[1]);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        data: response
      })
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('verify/:token')
  @HttpCode(200)
  async verify(@Res() res: Response, @Req() req: Request, @Param('token') token:string) {
    try{
      this.logger.log('New request to verify token');
      const response = await this.cardTokenizationService.verify(token, req.headers.authorization?.split(' ')[1]);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: response
      })
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
