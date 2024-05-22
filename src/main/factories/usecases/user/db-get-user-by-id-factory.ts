import { UserPrismaRepository } from '../../../../infra'
import { DbGetUserById } from '../../../../data/usecases'
import { PrismaHelper } from '../../../../infra/db/prisma/prisma-helper'

export const makeDbGetUserById = (): DbGetUserById => {
  const userPrismaRepository = new UserPrismaRepository(PrismaHelper)

  return new DbGetUserById(userPrismaRepository)
}
