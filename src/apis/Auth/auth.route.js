import express from 'express'
import authControler from './auth.controler.js'

const router = express.Router()

router.route('/login').post(authControler.login)
router.route('/register').post(authControler.register)
export default router