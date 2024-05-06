import { UserPrismaRepository } from '../../../../infra'
import { DbCreateUser } from '../../../../data/usecases'

export const makeDbCreateUser = (): DbCreateUser => {
  const userPrismaRepository = new UserPrismaRepository()

  return new DbCreateUser(userPrismaRepository)
}
