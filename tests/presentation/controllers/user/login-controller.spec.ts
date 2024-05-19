/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { LoginSpy } from '../../mocks'
import { LoginController } from '../../../../src/presentation/controllers'
import { Encrypter, badRequest, ok, serverError, unauthorized } from '../../../../src/presentation/helpers'
import type { HttpRequest } from '../../../../src/presentation/protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  encrypter: Encrypter
  loginSpy: LoginSpy
}

const makeSut = (): SutTypes => {
  const loginSpy = new LoginSpy()
  const encrypter = new Encrypter(8)
  const sut = new LoginController(loginSpy, encrypter)

  return {
    sut,
    encrypter,
    loginSpy
  }
}

describe('LoginController', () => {
  test('Should call LoginSpy with correct values', async () => {
    const { sut, loginSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loginSpy.input).toEqual(request.body)
  })

  test('Should return 500 if LoginSpy throws', async () => {
    const { sut, loginSpy } = makeSut()
    jest.spyOn(loginSpy, 'login').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return an user on success', async () => {
    const { sut, loginSpy, encrypter } = makeSut()
    jest.spyOn(encrypter, 'compare').mockResolvedValueOnce(true)
    const httpResponse = await sut.handle(mockRequest())
    const responseMinusToken = {
      id: httpResponse.body.id,
      name: httpResponse.body.name,
      email: httpResponse.body.email,
      password: httpResponse.body.password,
      createdAt: httpResponse.body.createdAt,
      updatedAt: httpResponse.body.updatedAt,
      lastLoginAt: httpResponse.body.lastLoginAt,
      type: httpResponse.body.type
    }
    console.log(responseMinusToken)
    expect(responseMinusToken).toEqual({
      id: loginSpy.output?.id,
      name: loginSpy.output?.name,
      email: loginSpy.output?.email,
      password: undefined,
      createdAt: loginSpy.output?.createdAt,
      updatedAt: loginSpy.output?.updatedAt,
      lastLoginAt: loginSpy.output?.lastLoginAt,
      type: loginSpy.output?.type
    })
    expect(httpResponse.body.token).toBeTruthy()
  })

  test('Should return 400 if data is invalid', async () => {
    const { sut } = makeSut()

    const requestA = { body: { email: 'any_email@mail.com' } }
    const requestB = { body: { password: 'any_password' } }

    const responseA = await sut.handle(requestA)
    const responseB = await sut.handle(requestB)

    expect(responseA).toEqual(badRequest(new Error('Password is required')))
    expect(responseB).toEqual(badRequest(new Error('Email is required')))
  })

  test('Should return 401 if credentials are incorrect', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.body.password = 'invalid_password'
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unauthorized())
  })
})
