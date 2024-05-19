import { adaptRoute } from '../adapters'
import {
  makeCreateUserController,
  makeDisableUserController,
  makeGetUserByIdController,
  makeLoginController,
  makeLogoutController
} from '../factories'
import { auth } from '../middlewares'
import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/user/create', auth, adaptRoute(makeCreateUserController()))
  router.get('/user/get/:userId', auth, adaptRoute(makeGetUserByIdController()))
  router.delete('/user/disable', auth, adaptRoute(makeDisableUserController()))

  router.post('/user/login', adaptRoute(makeLoginController()))
  router.post('/user/logout', auth, adaptRoute(makeLogoutController()))
}
