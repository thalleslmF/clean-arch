import { HttpRequest, HttpResponse } from '../protocols/http/http'
import { badRequest } from '../helpers/bad-request'
import { Controller } from '../controller'
import { AddAccountUseCase } from '../../domain/account/account-usecase'
import { AddAccountRequest } from '../../data/usecases/add-account-request'

export interface EmailValidator {
   isValid(email: string): boolean;
}
export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccountUsecase: AddAccountUseCase) {

  }
  async handle(httpRequest: HttpRequest ): Promise<HttpResponse> {
    const error: Error[] = []
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    const request = httpRequest.body
    requiredFields.map(
      field => this.validateField(field, request, error)
    )
    if (!this.emailValidator.isValid(request['email'])) {
      error.push(new Error('Invalid Email'))
    }
    if (request['confirmPassword'] !== request['password']) {
      error.push(new Error('password doesnt match'))
    }
    if (error.length) {
      return badRequest(error)
    } else {
      await this.addAccountUsecase.execute(new AddAccountRequest(request['name'], request['password'], request['.email']))
      return {
        statusCode: 200
      }
    }
  }

  private validateField(field: string, request: HttpRequest, error: Error[]) {

    if (!request[field] ) {
      error.push(new Error(`field not present ${field}`))
    }
  }
}
