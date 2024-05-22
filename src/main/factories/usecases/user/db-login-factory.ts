import { UserPrismaRepository } from '../../../../infra'
import { DbLogin } from '../../../../data/usecases'
import { PrismaHelper } from '../../../../infra/db/prisma/prisma-helper'

export const makeDbLogin = (): DbLogin => {
  const userPrismaRepository = new UserPrismaRepository(PrismaHelper)

  return new DbLogin(userPrismaRepository)
}
