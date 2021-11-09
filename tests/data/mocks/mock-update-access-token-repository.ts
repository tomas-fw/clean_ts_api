import { UpdateAccessTokenRepository } from '../../../src/data/protocols'

export class UpdateAccessTokenRepositoryStub
  implements UpdateAccessTokenRepository
{
  async updateAccessToken(id: string, token: string): Promise<void> {}
}
