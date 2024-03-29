import { BcryptAdapter } from '@infra/cryptography'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return await Promise.resolve('hash')
  },

  compare: async (): Promise<boolean> => {
    return await Promise.resolve(true)
  }
}))
type SutTypes = {
  sut: BcryptAdapter
}

const salt = 12
const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)

  return {
    sut
  }
}
describe('BcryptAdapter', () => {
  describe('hash', () => {
    test('should call bcrypt with correct values', async () => {
      const { sut } = makeSut()
      const encryptSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(encryptSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('should return a hash on success', async () => {
      const { sut } = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    test('should throws if hash throws', async () => {
      const { sut } = makeSut()

      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare', () => {
    test('should call bcrypt with correct values', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      const params = ['any_value', 'any_hash']
      await sut.compare(params[0], params[1])
      expect(compareSpy).toHaveBeenCalledWith(params[0], params[1])
    })

    test('should return a true on success', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('should return false if compare fails', async () => {
      const { sut } = makeSut()

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)

      const isValid = await sut.compare('any_value', 'any_hash')
      await expect(isValid).toBe(false)
    })

    test('should throws if compare throws', async () => {
      const { sut } = makeSut()

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
