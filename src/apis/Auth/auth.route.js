import express from 'express'
import authControler from './auth.controller.js'
import { verifyAccessToken } from '../../middleware/Verify.middleware.js'

const router = express.Router()

router.route('/login').post(authControler.login)
router.route('/register').post(authControler.register)
router.route('/profile').get(verifyAccessToken, authControler.getProfile)

export default router