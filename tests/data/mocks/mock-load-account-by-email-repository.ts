import { LoadAccountByEmailRepository } from '../../../src/data/protocols'
import { AccountModel } from '../../../src/domain/models'

export class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository
{
  async loadByEmail(email: string): Promise<AccountModel> {
    const account: AccountModel = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }
    return account
  }
}
