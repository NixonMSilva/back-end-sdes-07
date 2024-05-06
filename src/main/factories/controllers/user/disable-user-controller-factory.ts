import { makeDbDisableUser } from '../../usecases'
import { DisableUserController } from '../../../../presentation/controllers'

export const makeDisableUserController = (): DisableUserController => {
  return new DisableUserController(makeDbDisableUser())
}
