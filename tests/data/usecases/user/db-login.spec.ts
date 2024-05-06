/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { LoginRepositorySpy } from '../../mocks'
import { DbLogin } from '../../../../src/data/usecases'

type SutTypes = {
  sut: DbLogin
  loginRepositorySpy: LoginRepositorySpy
}

const makeSut = (): SutTypes => {
  const loginRepositorySpy = new LoginRepositorySpy()
  const sut = new DbLogin(loginRepositorySpy)

  return { sut, loginRepositorySpy }
}

describe('DbLogin Usecase', () => {
  test('Should call LoginRepositorySpy with correct values', async () => {
    const { sut, loginRepositorySpy } = makeSut()
    await sut.login('any_email', 'any_password')
    expect(loginRepositorySpy.input).toStrictEqual({
      email: 'any_email',
      password: 'any_password'
    })
  })

  test('Should throw if LoginRepositorySpy throws', async () => {
    const { sut, loginRepositorySpy } = makeSut()
    jest.spyOn(loginRepositorySpy, 'login').mockRejectedValueOnce(new Error())
    const promise = sut.login('any_email', 'any_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user if credentials are valid', async () => {
    const { sut, loginRepositorySpy } = makeSut()
    const user = await sut.login('any_email', 'any_password')
    expect(user).toEqual(loginRepositorySpy.output)
  })

  test('Should return null if credentials are invalid', async () => {
    const { sut } = makeSut()
    const user = await sut.login('invalid_email', 'invalid_password')
    expect(user).toBeNull()
  })
})
