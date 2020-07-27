import { AccountModel } from '../../domain/account/model/account-model'
import { AddAccountRequest } from '../../data/usecases/add-account-request'
export interface AddAccountUseCase {
   execute: (account: AddAccountRequest) => Promise<AccountModel>;
}
