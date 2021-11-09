import jwt from 'jsonwebtoken'
import { Encrypter } from '../../data/protocols'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return token
  }
}
