/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { DisableUserSpy } from '../../mocks'
import { DisableUserController } from '../../../../src/presentation/controllers'
import { notFound, ok, serverError } from '../../../../src/presentation/helpers'
import type { HttpRequest } from '../../../../src/presentation/protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    userId: '999'
  }
})

type SutTypes = {
  sut: DisableUserController
  disableUserSpy: DisableUserSpy
}

const makeSut = (): SutTypes => {
  const disableUserSpy = new DisableUserSpy()
  const sut = new DisableUserController(disableUserSpy)

  return {
    sut,
    disableUserSpy
  }
}

describe('DisableUserController', () => {
  test('Should call DisableUserSpy with correct values', async () => {
    const { sut, disableUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(disableUserSpy.input).toBe(999)
  })

  test('Should return 500 if DisableUserSpy throws', async () => {
    const { sut, disableUserSpy } = makeSut()
    jest.spyOn(disableUserSpy, 'disable').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok('User disabled'))
  })

  test('Should return 404 if user does not exist', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.body.userId = '998'
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound())
  })
})
