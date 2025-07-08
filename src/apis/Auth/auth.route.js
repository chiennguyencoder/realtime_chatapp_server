import express from 'express'
import authControler from './auth.controler.js'

const router = express.Router()

router.route('/login').post(authControler.login)

export default router