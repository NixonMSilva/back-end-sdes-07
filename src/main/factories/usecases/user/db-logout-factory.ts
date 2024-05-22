import { UserPrismaRepository } from '../../../../infra'
import { DbLogout } from '../../../../data/usecases'
import { PrismaHelper } from '../../../../infra/db/prisma/prisma-helper'

export const makeDbLogout = (): DbLogout => {
  const userPrismaRepository = new UserPrismaRepository(PrismaHelper)

  return new DbLogout(userPrismaRepository)
}
