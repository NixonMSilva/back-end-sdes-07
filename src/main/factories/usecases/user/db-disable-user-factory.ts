import { UserPrismaRepository } from '../../../../infra'
import { DbDisableUser } from '../../../../data/usecases'
import { PrismaHelper } from '../../../../infra/db/prisma/prisma-helper'

export const makeDbDisableUser = (): DbDisableUser => {
  const userPrismaRepository = new UserPrismaRepository(PrismaHelper)

  return new DbDisableUser(userPrismaRepository)
}
