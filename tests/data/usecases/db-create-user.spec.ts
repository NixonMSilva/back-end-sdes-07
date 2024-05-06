/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { CreateUserRepositorySpy } from '../mocks'
import { DbCreateUser } from '../../../src/data/usecases'
import { mockCreateUserInput } from '../../domain/mocks'

type SutTypes = {
  sut: DbCreateUser
  createUserRepositorySpy: CreateUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const createUserRepositorySpy = new CreateUserRepositorySpy()
  const sut = new DbCreateUser(createUserRepositorySpy)

  return { sut, createUserRepositorySpy }
}

describe('DbCreateUser Usecase', () => {
  test('Should call CreateUserRepositorySpy with correct values', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    const userInput = mockCreateUserInput()
    await sut.create(userInput)
    expect(createUserRepositorySpy.input).toEqual(userInput)
  })

  test('Should throw if CreateUserRepositorySpy throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    jest.spyOn(createUserRepositorySpy, 'create').mockRejectedValueOnce(new Error())
    const promise = sut.create(mockCreateUserInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user if input is valid', async () => {
    const { sut, createUserRepositorySpy } = makeSut()
    const userInput = mockCreateUserInput()
    const user = await sut.create(userInput)
    expect(user).toEqual(createUserRepositorySpy.output)
  })
})
