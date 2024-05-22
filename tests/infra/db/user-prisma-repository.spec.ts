import { UserPrismaRepository } from '../../../src/infra/db'
import { PrismaHelper } from '../../../src/infra/db/prisma/prisma-helper'
import { prismaMock } from '../prisma/prisma-mock'
import { type DeepMockProxy } from 'jest-mock-extended'
import type { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SutTypes = {
  sut: UserPrismaRepository
  prismaSpy: DeepMockProxy<PrismaClient>
}

const makeSut = (): SutTypes => {
  const prismaSpy = prismaMock
  const sut = new UserPrismaRepository(prismaSpy)
  return {
    sut,
    prismaSpy
  }
}

const mockUserData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
  name: 'any_name',
  email: 'test_email@mail.com',
  password: 'test_passwword',
  type: 0,
  isEnabled: true
}

describe('User Prisma Repository', () => {
  test('Should create new user', async () => {
    const { sut, prismaSpy } = makeSut()
    prismaSpy.user.create.mockResolvedValueOnce(mockUserData)
    await expect(sut.create(mockUserData)).resolves.toEqual({
      id: mockUserData.id,
      createdAt: mockUserData.createdAt,
      updatedAt: mockUserData.updatedAt,
      lastLoginAt: mockUserData.lastLoginAt,
      name: mockUserData.name,
      email: mockUserData.email,
      type: mockUserData.type
    })
  })

  test('Should throw if any UserRepository function throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'create').mockRejectedValueOnce(new Error())
    jest.spyOn(sut, 'disable').mockRejectedValueOnce(new Error())
    jest.spyOn(sut, 'getById').mockRejectedValueOnce(new Error())
    jest.spyOn(sut, 'login').mockRejectedValueOnce(new Error())
    jest.spyOn(sut, 'logout').mockRejectedValueOnce(new Error())
    const promiseCreate = sut.create(mockUserData)
    const promiseDisable = sut.disable(mockUserData.id)
    const promiseGetById = sut.getById(mockUserData.id)
    const promiseLogin = sut.login(mockUserData.email, mockUserData.password)
    const promiseLogout = sut.logout(mockUserData.id)
    await expect(promiseCreate).rejects.toThrow()
    await expect(promiseDisable).rejects.toThrow()
    await expect(promiseGetById).rejects.toThrow()
    await expect(promiseLogin).rejects.toThrow()
    await expect(promiseLogout).rejects.toThrow()
  })
})
