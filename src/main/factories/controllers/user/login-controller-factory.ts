import { makeDbLogin } from '../../usecases'
import { LoginController } from '../../../../presentation/controllers'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeDbLogin())
}
