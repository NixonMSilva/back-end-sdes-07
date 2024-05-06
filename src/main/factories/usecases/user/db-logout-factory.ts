import { UserPrismaRepository } from '../../../../infra'
import { DbLogout } from '../../../../data/usecases'

export const makeDbLogout = (): DbLogout => {
  const userPrismaRepository = new UserPrismaRepository()

  return new DbLogout(userPrismaRepository)
}
