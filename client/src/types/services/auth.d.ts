type PostSMSAuthenticateDto = {
  phoneNumber: string
}

type PostSMSAuthenticateResponseVO = {
  hash_key: string
}

type CheckSMSAuthenticateDto = {
  hash_key: string
  phoneNumber: string
  authenticatedNumber: string
}

type CheckSMSAuthenticateVO = {
  isValidate: boolean
}
