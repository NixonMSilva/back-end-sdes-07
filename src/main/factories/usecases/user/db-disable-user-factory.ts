import { UserPrismaRepository } from '../../../../infra'
import { DbDisableUser } from '../../../../data/usecases'

export const makeDbDisableUser = (): DbDisableUser => {
  const userPrismaRepository = new UserPrismaRepository()

  return new DbDisableUser(userPrismaRepository)
}
