import User from '../../models/user.model.js'
import { AppError } from '../../middleware/ErrorHandler.js'
import hashProvider from '../../provider/hash.provider.js'
import generateAccessToken from '../../provider/jwt.provider.js'

class AuthService {
    async login(inputEmail, inputPassword){

        const user = await User.findOne({email: inputEmail})
        if (!user){
            throw new AppError('Tài khoản không tồn tại', 404)
        }

        const isValidPassword = await hashProvider.compareHash(inputPassword, user.password)
        if (!isValidPassword){
            throw new AppError('Mật khẩu không chính xác', 401)
        }

        const accessToken = await generateAccessToken({id : user._id, role : user.role})
        const {password, ...safeUser} = user.toObject()
        return {accessToken, safeUser}
    }

    async register(inputData){
        const {email, iPassword, username} = inputData

        const isExistEmail = await User.findOne({email})
        if (isExistEmail){
            throw new AppError('Email này đã được sử dụng.', 400)
        }

        const hashPassword = await hashProvider.generateHash(iPassword)

        const user = await User.create({
            username,
            email,
            password : hashPassword,
        })
        
        const {password, ...safeUser} = user.toObject()

        return safeUser
    }
}

export default new AuthService()