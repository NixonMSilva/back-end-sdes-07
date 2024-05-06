import { PrismaHelper } from './prisma-helper'
import type {
  CreateUserRepository,
  CreateUserRepositoryInput,
  CreateUserRepositoryOutput,
  DisableUserRepository,
  GetUserByIdRepository,
  GetUserByIdRepositoryOutput,
  LoginRepository,
  LoginRepositoryOutput,
  LogoutRepository
} from '@/data/protocols'

export class UserPrismaRepository implements CreateUserRepository, DisableUserRepository, GetUserByIdRepository,
  LoginRepository, LogoutRepository {
  async create (data: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput> {
    const currentDate = new Date()
    const user = await PrismaHelper.user.create({
      data: {
        lastLoginAt: currentDate.toISOString(),
        email: data.email,
        password: data.password,
        type: data.type
      }
    })

    const userData = {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      name: user.name ?? '',
      email: user.email,
      type: user.type
    }

    return userData
  }

  async disable (userId: number): Promise<boolean> {
    const user = await PrismaHelper.user.update({
      where: {
        id: userId
      },
      data: {
        isEnabled: false
      }
    })

    if (user) {
      return true
    }

    return false
  }

  async getById (userId: number): Promise<GetUserByIdRepositoryOutput> {
    const user = await PrismaHelper.user.findUnique({
      where: {
        id: userId
      }
    })

    if (user) {
      const userData = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        name: user.name ?? '',
        email: user.email,
        type: user.type
      }
      return userData
    }

    return null
  }

  async login (email: string, password: string): Promise<LoginRepositoryOutput> {
    const user = await PrismaHelper.user.findFirst({
      where: {
        email,
        password
      }
    })

    if (user) {
      const userData = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        name: user.name ?? '',
        email: user.email,
        type: user.type
      }
      return userData
    }

    return null
  }

  async logout (userId: number): Promise<void> {

  }
}
