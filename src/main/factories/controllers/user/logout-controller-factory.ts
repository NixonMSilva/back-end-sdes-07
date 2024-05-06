import { makeDbLogout } from '../../usecases'
import { LogoutController } from '../../../../presentation/controllers'

export const makeLogoutController = (): LogoutController => {
  return new LogoutController(makeDbLogout())
}
