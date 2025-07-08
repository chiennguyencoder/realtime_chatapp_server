import express from 'express'
import UserRouter from './User/user.route.js'
import AuthRouter from './Auth/auth.route.js'

const router = express.Router()

router.use('/users', UserRouter)
router.use('/auth', AuthRouter)

export default router