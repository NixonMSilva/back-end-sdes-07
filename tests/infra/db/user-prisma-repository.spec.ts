import { UserPrismaRepository } from '../../../src/infra/db'
import { PrismaHelper } from '../../../src/infra/db/prisma/prisma-helper'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SutTypes = {
  sut: UserPrismaRepository
}

const makeSut = (): SutTypes => {
  const sut = new UserPrismaRepository()
  return { sut }
}

const mockUserData = {
  email: 'test_email@mail.com',
  password: 'test_passwword',
  type: 0
}

describe('User Prisma Repository', () => {
  let userId: number

  test('Insert User Into Database', async () => {
    const { sut } = makeSut()
    const result = await sut.create(mockUserData)

    userId = Number(result?.id)

    expect(result).toBeTruthy()
  })

  test('Retrieve User From Database', async () => {
    const { sut } = makeSut()
    const user = await sut.getById(userId)

    expect(user?.email).toEqual(mockUserData.email)
  })

  test('Disable User From Database', async () => {
    const { sut } = makeSut()
    const result = await sut.disable(userId)
    expect(result).toBeTruthy()

    const deletion = await PrismaHelper.user.delete({
      where: {
        id: userId
      }
    })

    if (!deletion) {
      console.warn('User not deleted, you should check the database via prisma studio, run `npx prisma studio`')
    }
  })
})
