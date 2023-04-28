import { IsNotEmpty, IsNumber, IsEmail, Min, Max, Validate } from 'class-validator';
import { IsValidNumberCard, IsValidLengthCard, IsValidExpirationMonth, IsValidExpirationYear, IsValidEmailDomain } from '../validations/validations';

export class CardDTO {
  @IsNotEmpty({ message: 'Por favor, ingrese el número de tarjeta.' })
  @Validate( IsValidNumberCard )
  @Validate( IsValidLengthCard )
  @IsNumber({allowNaN: false}, { message: 'Por favor, solo ingrese dígitos para el número de la tarjeta.' })
  card_number: number

  @IsNotEmpty({ message: 'Por favor, ingrese el cvv de tarjeta.' })
  @Min(100, { message: 'El cvv de tarjeta debe ser mínimo de 3 dígitos.' })
  @Max(9999, { message: 'El cvv de tarjeta debe ser máximo de 4 dígitos.' })
  @IsNumber({allowNaN: false}, { message: 'Por favor, solo ingrese dígitos para el cvv de la tarjeta.' })
  cvv: number

  @IsNotEmpty({ message: 'Por favor, ingrese el mes de expiración de tarjeta.' })
  @Validate( IsValidExpirationMonth )
  expiration_month: string

  @IsNotEmpty({ message: 'Por favor, ingrese el año de expiración de tarjeta.' })
  @Validate( IsValidExpirationYear )
  expiration_year: string

  @IsNotEmpty({ message: 'Por favor, ingrese un email.' })
  @Validate( IsValidEmailDomain )
  @IsEmail({}, { message: 'Por favor, ingrese un email válido.' })
  email: string
}