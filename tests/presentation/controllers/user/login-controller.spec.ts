/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { LoginSpy } from '../../mocks'
import { LoginController } from '../../../../src/presentation/controllers'
import { badRequest, ok, serverError, unauthorized } from '../../../../src/presentation/helpers'
import type { HttpRequest } from '../../../../src/presentation/protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  loginSpy: LoginSpy
}

const makeSut = (): SutTypes => {
  const loginSpy = new LoginSpy()
  const sut = new LoginController(loginSpy)

  return {
    sut,
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
    const { sut, loginSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loginSpy.output))
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
