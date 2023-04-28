import { isCreditCard, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

export enum ValidEmailDomainDefinition {
  GMAIL = 'gmail.com',
  HOTMAIL = 'hotmail.com',
  YAHOO = 'yahoo.es'
}

@ValidatorConstraint({ name: 'IsValidNumberCard', async: false })
export class IsValidNumberCard implements ValidatorConstraintInterface {
  validate(numberCard: number, args: ValidationArguments) {
    return isCreditCard(numberCard.toString());
  }

  defaultMessage(args: ValidationArguments) {
    return 'El número de la tarjeta no es válido.';
  }
}

@ValidatorConstraint({ name: 'IsValidNumberCard', async: false })
export class IsValidLengthCard implements ValidatorConstraintInterface {
  validate(numberCard: number, args: ValidationArguments) {
    return numberCard.toString().length>=13 && numberCard.toString().length<=16;
  }

  defaultMessage(args: ValidationArguments) {
    return 'El número de la tarjeta debe ser de 13 a 16 dígitos.';
  }
}

@ValidatorConstraint({ name: 'IsValidExpirationYear', async: false })
export class IsValidExpirationYear implements ValidatorConstraintInterface {
  validate(year: string, args: ValidationArguments) {
    const currentYear = new Date().getFullYear();
    return !Number.isNaN(Number(year)) && Number(year) >= currentYear && Number(year) <= currentYear + 5;
  }

  defaultMessage(args: ValidationArguments) {
    return `El número no corresponde a un año válido.`;
  }
}

@ValidatorConstraint({ name: 'IsValidExpirationMonth', async: false })
export class IsValidExpirationMonth implements ValidatorConstraintInterface {
  validate(month: string, args: ValidationArguments) {
    return !Number.isNaN(Number(month)) && Number(month) >= 1 && Number(month) <= 12;
  }

  defaultMessage(args: ValidationArguments) {
    return `El número no corresponde a a un mes válido.`;
  }
}

@ValidatorConstraint({ name: 'IsValidEmailDomain', async: false })
export class IsValidEmailDomain implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    const emailDomain = email?.split('@').pop();
    return emailDomain !== undefined && Object.values<string>(ValidEmailDomainDefinition).includes(emailDomain);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `El dominio del correo no corresponde a un dominio válido, por favor ingresa un email de los siguientes dominios ${Object.values(ValidEmailDomainDefinition).join(', ')}.`;
  }
}