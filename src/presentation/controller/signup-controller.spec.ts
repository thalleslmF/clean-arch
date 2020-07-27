import { EmailValidator, SignUpController } from './signup-controller'
import { HttpRequest } from '../protocols/http/http'
import { AddAccountUseCase } from '../../domain/account/account-usecase'
import { AddAccountRequest } from '../../data/usecases/add-account-request'
import { AccountModel } from '../../domain/account/model/account-model'

class EmailValidatorStub implements EmailValidator {
  isValid(email: string): boolean {
    return false
  }
}

class AddAccountUseCaseStub implements AddAccountUseCase {
  execute(accountRequest: AddAccountRequest): Promise<AccountModel> {
    return Promise.resolve({} as AccountModel)
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async() => {

    const signUpController = new SignUpController(new EmailValidatorStub(), new AddAccountUseCaseStub())
    const httpRequest: HttpRequest = {
      body : {
        email: 'email',
        password: 'password',
        confirmPassword: 'password',
      }
    }
    const result = await signUpController.handle(httpRequest)

    expect(result.statusCode).toBe(400)
  })
  test('Should return 400 if email is invalid', async() => {

    const signUpController = new SignUpController(new EmailValidatorStub(), new AddAccountUseCaseStub())
    const httpRequest: HttpRequest = {
      body : {
        email: 'email',
        password: 'password',
        confirmPassword: 'password',
        name: 'thalles'
      }
    }
    const result = await signUpController.handle(httpRequest)

    expect(result.statusCode).toBe(400)
  })
  test('Should return 200 if email is valid', async() => {
    const emailValidator = new EmailValidatorStub()
    jest.spyOn(emailValidator, 'isValid')
      .mockImplementation( () => true)
    const signUpController = new SignUpController(emailValidator, new AddAccountUseCaseStub())
    const httpRequest: HttpRequest = {
      body : {
        email: 'email',
        password: 'password',
        confirmPassword: 'password',
        name: 'thalles'
      }
    }
    const result = await signUpController.handle(httpRequest)

    expect(result.statusCode).toBe(200)
  })
})
