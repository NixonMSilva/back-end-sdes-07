import type { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, type DeepMockProxy } from 'jest-mock-extended'

import { PrismaHelper } from '../../../src/infra/db/prisma/prisma-helper'

jest.mock('../../../src/infra/db/prisma/prisma-helper', () => ({
  __esModule: true,
  PrismaHelper: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = PrismaHelper as unknown as DeepMockProxy<PrismaClient>
