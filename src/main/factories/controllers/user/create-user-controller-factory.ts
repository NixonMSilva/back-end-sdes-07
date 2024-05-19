import { makeDbCreateUser } from '../../usecases'
import env from '../../../config/env'
import { Encrypter } from '../../../../presentation/helpers'
import { CreateUserController } from '../../../../presentation/controllers'

export const makeCreateUserController = (): CreateUserController => {
  const encrypter = new Encrypter(env.saltRounds as number)
  return new CreateUserController(makeDbCreateUser(), encrypter)
}
