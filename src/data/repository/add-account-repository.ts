import { AccountModel } from '../../domain/account/model/account-model'
import { AddAccountRequest } from '../usecases/add-account-request'

export interface AddAccountRepository {
  save: (account: AddAccountRequest) => Promise<AccountModel>;
}
