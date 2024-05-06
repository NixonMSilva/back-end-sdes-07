/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { CreateUserSpy } from '../../mocks'
import { CreateUserController } from '../../../../src/presentation/controllers'
import { badRequest, ok, serverError } from '../../../../src/presentation/helpers'
import type { HttpRequest } from '../../../../src/presentation/protocols'

import * as bcrypt from 'bcrypt'

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: CreateUserController
  createUserSpy: CreateUserSpy
}

const makeSut = (): SutTypes => {
  const createUserSpy = new CreateUserSpy()
  const sut = new CreateUserController(createUserSpy)

  return {
    sut,
    createUserSpy
  }
}

describe('CreateUserController', () => {
  test('Should call CreateUserSpy with correct values', async () => {
    const { sut, createUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createUserSpy.input).toHaveProperty('email', 'any_email@mail.com')
    expect(createUserSpy.input).toHaveProperty('type', 1)
    expect(bcrypt.compareSync('any_password', createUserSpy.input.password)).toBe(true)
  })

  test('Should return 500 if CreateUserSpy throws', async () => {
    const { sut, createUserSpy } = makeSut()
    jest.spyOn(createUserSpy, 'create').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 on success', async () => {
    const { sut, createUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(createUserSpy.output))
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
})
