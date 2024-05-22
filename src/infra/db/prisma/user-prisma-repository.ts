import type { PrismaClient } from '@prisma/client'
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
} from '../../../data/protocols'

export class UserPrismaRepository implements CreateUserRepository, DisableUserRepository, GetUserByIdRepository,
  LoginRepository, LogoutRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async create (data: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput> {
    const currentDate = new Date()

    // Check if a user already exists with the same email before creating it
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      return null
    }

    // If email is not used, proceed to usual user creation
    const user = await this.prisma.user.create({
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
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!existingUser) {
      return false
    }

    const user = await this.prisma.user.update({
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
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user) {
      const userData = {
        id: user.id,
        password: user.password,
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
