import { AddAccountUseCase } from '../../domain/account/account-usecase'
import { Encryptor } from '../../utils/encryptor'
import { AccountModel } from '../../domain/account/model/account-model'
import { AddAccountRepository } from '../repository/add-account-repository'
import { AddAccountRequest } from './add-account-request'

export class AddAccountUsecaseImpl implements AddAccountUseCase {
  constructor(private readonly encryptor: Encryptor,
              private readonly repository: AddAccountRepository,
  ) {
  }
  async execute(account: AddAccountRequest): Promise<AccountModel> {
    const hashedPassword = await this.encryptor.encrypt(account.password)
    await this.repository.save({ ...account, password: hashedPassword })
    return Promise.resolve(account)
  }

}
