import  AuthService from './auth.service.js'
import * as AuthValidate from '../../validation/auth.validator.js'
import { de } from 'zod/v4/locales'

class AuthController {
    async login(req, res, next){
        try {
            const {email, password} = req.body
            const result = AuthValidate.loginValidate.safeParse(req.body)
            if (!result.success){
                throw result.error
            }

            const user = await AuthService.login(email, password)
            return res.status(200).json({
                status : 'success',
                msg : 'Đăng nhập thành công.',
                token : user.accessToken,
                user : user.safeUser
            })
        }
        catch(err){
            next(err)
        }
    }
}

export default new AuthController()