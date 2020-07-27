import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator', () => {
  test('it should return false if email is not valid', () => {
    const emailValidator = new EmailValidatorAdapter()
    expect(emailValidator.isValid('notemail')).toBe(false)
  })
  test('it should return true if email is valid', () => {
    const emailValidator = new EmailValidatorAdapter()
    expect(emailValidator.isValid('lopthalles@gmail.com')).toBe(true)
  })
})
