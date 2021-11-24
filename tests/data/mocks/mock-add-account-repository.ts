import { AddAccountRepository } from '@data/protocols'
import { AccountModel } from '@domain/models'
import { AddAccountParams } from '@domain/usecases'

export class AddAccountRepositoryStub implements AddAccountRepository {
  async add(account: AddAccountParams): Promise<AccountModel> {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }

    return await new Promise((resolve) => resolve(fakeAccount))
  }
}
