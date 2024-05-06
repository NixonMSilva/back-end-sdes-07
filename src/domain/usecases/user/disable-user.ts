export interface DisableUser {
  disable: (userId: number) => Promise<boolean>
}
