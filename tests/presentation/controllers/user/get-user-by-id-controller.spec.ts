/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { GetUserByIdSpy } from '../../mocks'
import { GetUserByIdController } from '../../../../src/presentation/controllers'
import { notFound, ok, serverError } from '../../../../src/presentation/helpers'
import type { HttpRequest } from '../../../../src/presentation/protocols'

const mockRequest = (): HttpRequest => ({
  params: {
    userId: '999'
  }
})

type SutTypes = {
  sut: GetUserByIdController
  getUserByIdSpy: GetUserByIdSpy
}

const makeSut = (): SutTypes => {
  const getUserByIdSpy = new GetUserByIdSpy()
  const sut = new GetUserByIdController(getUserByIdSpy)

  return {
    sut,
    getUserByIdSpy
  }
}

describe('GetUserByIdController', () => {
  test('Should call GetUserByIdSpy with correct values', async () => {
    const { sut, getUserByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(getUserByIdSpy.input).toBe(999)
  })

  test('Should return 500 if DisableUserSpy throws', async () => {
    const { sut, getUserByIdSpy } = makeSut()
    jest.spyOn(getUserByIdSpy, 'getById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return an user on success', async () => {
    const { sut, getUserByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(getUserByIdSpy.output))
  })

  test('Should return 404 if user does not exist', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.params.userId = '998'
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound())
  })
})
