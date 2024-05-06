import { makeDbCreateUser } from '../../usecases'
import { CreateUserController } from '../../../../presentation/controllers'

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makeDbCreateUser())
}
