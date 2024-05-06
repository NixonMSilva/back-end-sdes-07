import { makeDbGetUserById } from '../../usecases'
import { GetUserByIdController } from '../../../../presentation/controllers'

export const makeGetUserByIdController = (): GetUserByIdController => {
  return new GetUserByIdController(makeDbGetUserById())
}
