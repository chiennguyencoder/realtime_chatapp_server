import User from '../../models/user.model.js'
import { AppError } from '../../middleware/ErrorHandler.js'
import hashProvider from '../../provider/hash.provider.js'
import generateAccessToken from '../../provider/jwt.provider.js'
import { ObjectId } from 'mongodb'
class AuthService {
    async login(inputEmail, inputPassword){

        const user = await User.findOne({email: inputEmail})
        if (!user){
            throw new AppError('Tài khoản không tồn tại', 404)
        }

        const isValidPassword = hashProvider.compareHash(inputPassword, user.password)
        if (!isValidPassword){
            throw new AppError('Mật khẩu không chính xác', 401)
        }

        const accessToken = await generateAccessToken({id : user._id, role : user.role})
        const {password, ...safeUser} = user.toObject()
        return {accessToken, safeUser}
    }
}

export default new AuthService()