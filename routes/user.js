import express from 'express'
import * as usersController from '../controllers/user.js'

const router = express.Router()

router.route('/')
  .post(usersController.create)
  .get(usersController.index)

export default router
