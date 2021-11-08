import { MissingParamError } from '../../../src/presentation/errors'
import { Validation } from '../../../src/presentation/protocols'
import { RequiredFieldValidation } from '../../../src/validations/validators'

interface SutTypes {
  sut: Validation
}
const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')
  return {
    sut
  }
}

describe('RequiredField Validation', () => {
  test('should return MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ other_field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
