import { AddAccountUsecaseImpl } from './add-account.usecase'
import { Encryptor } from '../../utils/encryptor'
import { AccountModel } from '../../domain/account/model/account-model'
import { AddAccountRepository } from '../repository/add-account-repository'
import { AddAccountRequest } from './add-account-request'
class EncryptorSub implements Encryptor {
  encrypt = (password: string) => {
    return 'hashedPassword'
  }
}
class AccountRepositorySub implements AddAccountRepository {
  save = (account: AddAccountRequest): Promise<AccountModel> => {
    return Promise.resolve((account as AccountModel) )
  }
}
describe('Add Account', () => {
  test('it should add account', async() => {
    const encryptor = new EncryptorSub()
    const accountRepository = new AccountRepositorySub()
    const encryptSpy = jest.spyOn(encryptor, 'encrypt')
    const repositorySpy = jest.spyOn(accountRepository, 'save')
    const account  = {
      name: 'name',
      email: 'dummy-email',
      password: 'dummy-password',
      confirmPassword: 'dummy-password',
    }
    const hashedAccount  = {
      name: 'name',
      email: 'dummy-email',
      password: 'hashedPassword',
    }
    const addAccount = new AddAccountUsecaseImpl(encryptor, accountRepository)
    await addAccount.execute(account)
    expect(encryptSpy).toBeCalledWith(account.password)
    expect(repositorySpy).toBeCalledWith({ ...account, password: 'hashedPassword' })
  })
})
