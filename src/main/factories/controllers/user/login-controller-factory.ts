import { makeDbLogin } from '../../usecases'
import { LoginController } from '../../../../presentation/controllers'
import { Encrypter } from '../../../../presentation/helpers'
import env from '../../../config/env'

export const makeLoginController = (): LoginController => {
  const encrypter = new Encrypter(env.saltRounds as number)
  return new LoginController(makeDbLogin(), encrypter)
}
