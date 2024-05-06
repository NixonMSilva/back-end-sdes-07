/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { DisableUserRepositorySpy } from '../mocks'
import { DbDisableUser } from '../../../src/data/usecases'

type SutTypes = {
  sut: DbDisableUser
  disableUserRepositorySpy: DisableUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const disableUserRepositorySpy = new DisableUserRepositorySpy()
  const sut = new DbDisableUser(disableUserRepositorySpy)

  return { sut, disableUserRepositorySpy }
}

const mockUserId = 999

describe('DbDisableUser Usecase', () => {
  test('Should call DisableUserRepositorySpy with correct values', async () => {
    const { sut, disableUserRepositorySpy } = makeSut()
    await sut.disable(mockUserId)
    expect(disableUserRepositorySpy.input).toEqual(mockUserId)
  })

  test('Should throw if DisableUserRepositorySpy throws', async () => {
    const { sut, disableUserRepositorySpy } = makeSut()
    jest.spyOn(disableUserRepositorySpy, 'disable').mockRejectedValueOnce(new Error())
    const promise = sut.disable(mockUserId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if userId is valid', async () => {
    const { sut } = makeSut()
    const result = await sut.disable(mockUserId)
    expect(result).toBe(true)
  })

  test('Should return false if userId is invalid', async () => {
    const { sut } = makeSut()
    const invalidUserId = 998
    const result = await sut.disable(invalidUserId)
    expect(result).toBe(false)
  })
})
