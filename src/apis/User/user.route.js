import express from 'express'
import UserController from './user.controller.js'

const UserRouter = express.Router()

UserRouter.route('/')
    .get(UserController.getAllUser)
    .post(UserController.createUser)

UserRouter.route('/:id')
    .delete(UserController.deleteOne)
export default UserRouter