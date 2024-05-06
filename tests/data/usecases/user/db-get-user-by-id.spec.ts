/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { GetUserByIdRepositorySpy } from '../../mocks'
import { DbGetUserById } from '../../../../src/data/usecases'
import { mockUserModel } from '../../../domain/mocks'

type SutTypes = {
  sut: DbGetUserById
  getUserByIdRepositorySpy: GetUserByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const getUserByIdRepositorySpy = new GetUserByIdRepositorySpy()
  const sut = new DbGetUserById(getUserByIdRepositorySpy)

  return { sut, getUserByIdRepositorySpy }
}

const mockUserId = 999

describe('DbGetUserById Usecase', () => {
  test('Should call GetUserByIdRepositorySpy with correct values', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()
    await sut.getById(mockUserId)
    expect(getUserByIdRepositorySpy.input).toEqual(mockUserId)
  })

  test('Should throw if DisableUserRepositorySpy throws', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()
    jest.spyOn(getUserByIdRepositorySpy, 'getById').mockRejectedValueOnce(new Error())
    const promise = sut.getById(mockUserId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if userId is valid', async () => {
    const { sut } = makeSut()
    const result = await sut.getById(mockUserId)
    expect(result).toEqual(mockUserModel())
  })

  test('Should return false if userId is invalid', async () => {
    const { sut } = makeSut()
    const invalidUserId = 998
    const result = await sut.getById(invalidUserId)
    expect(result).toBeNull()
  })
})
