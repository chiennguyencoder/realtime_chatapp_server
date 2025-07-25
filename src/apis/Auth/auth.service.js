import User from '../../models/user.model.js'
import { AppError } from '../../middleware/ErrorHandler.js'
import hashProvider from '../../provider/hash.provider.js'
import generateAccessToken from '../../provider/jwt.provider.js'

class AuthService {
    async login(inputEmail, inputPassword){

        const user = await User.findOne({email: inputEmail}).select('+password')
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
        const user = new User({
            ...inputData
        })

        await user.save()
        return user
    }

    async getProfile(userID){
        const user = await User.findById(userID)
        if (!user){
            throw new AppError('Người dùng không tồn tại', 404)
        }

        return user
    }
}

export default new AuthService()