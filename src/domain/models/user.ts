export interface UserModel {
  id: number
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date
  name?: string
  email: string
  password: string
  type: number
}
