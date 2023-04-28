
export type ValidPKResponse = {validated: boolean, message?: string};

export type SigninResponse = {token: string}

export type VerifyResponse = {email: string, card_number: string, expiration_month: string, expiration_year: string}