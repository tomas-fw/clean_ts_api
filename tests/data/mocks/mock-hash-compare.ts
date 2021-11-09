import { HashComparer } from '../../../src/data/protocols'

export class HashCompareStub implements HashComparer {
  async compare(password: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
