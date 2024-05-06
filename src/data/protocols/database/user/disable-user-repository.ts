export interface DisableUserRepository {
  disable: (userId: number) => Promise<boolean>
}
