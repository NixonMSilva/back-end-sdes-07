import { adaptRoute } from '../adapters'
import {
  makeCreateUserController,
  makeDisableUserController,
  makeGetUserByIdController,
  makeLoginController,
  makeLogoutController
} from '../factories'
import { type Router } from 'express'

export default (router: Router): void => {
  // TODO: Auth
  router.post('/user/create', adaptRoute(makeCreateUserController()))
  router.get('/user/get/:userId', adaptRoute(makeGetUserByIdController()))
  router.delete('/user/disable', adaptRoute(makeDisableUserController()))

  router.post('/user/login', adaptRoute(makeLoginController()))
  router.post('/user/logout', adaptRoute(makeLogoutController()))
}
