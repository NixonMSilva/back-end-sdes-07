import { UserPrismaRepository } from '../../../../infra'
import { DbGetUserById } from '../../../../data/usecases'

export const makeDbGetUserById = (): DbGetUserById => {
  const userPrismaRepository = new UserPrismaRepository()

  return new DbGetUserById(userPrismaRepository)
}
