import { UserPrismaRepository } from '../../../../infra'
import { DbCreateUser } from '../../../../data/usecases'
import { PrismaHelper } from '../../../../infra/db/prisma/prisma-helper'

export const makeDbCreateUser = (): DbCreateUser => {
  const userPrismaRepository = new UserPrismaRepository(PrismaHelper)

  return new DbCreateUser(userPrismaRepository)
}
