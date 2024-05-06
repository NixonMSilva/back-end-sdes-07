import { UserPrismaRepository } from '../../../../infra'
import { DbLogin } from '../../../../data/usecases'

export const makeDbLogin = (): DbLogin => {
  const userPrismaRepository = new UserPrismaRepository()

  return new DbLogin(userPrismaRepository)
}
