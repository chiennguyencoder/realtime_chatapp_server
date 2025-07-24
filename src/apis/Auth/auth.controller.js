import  AuthService from './auth.service.js'
import * as AuthValidate from '../../validation/auth.validator.js'

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

    async register(req, res, next){
        try {
            const user = await AuthService.register({
                username : req.body.username,
                password : req.body.password,
                email : req.body.email
            })
            return res.status(200).json({
                status : 'success',
                msg : 'Đăng ký thành công.',
                user
            })
        }
        catch(err){
            next(err)
        }
    }

    async getProfile(req, res, next){
        try {
            console.log(req.user)
            return res.status(200).json({
                status : "success",
                message : "GET USER INFO SUCCESSFULLY!"
            })
        }
        catch(err){
            next(err)
        }
    }

}

export default new AuthController()