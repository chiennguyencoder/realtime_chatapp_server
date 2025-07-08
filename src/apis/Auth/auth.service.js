import User from '../../models/user.model.js'
import { AppError } from '../../middleware/ErrorHandler.js'
class AuthService {
    async login(user){
        const {email, password} = user
        
        const isExistUser = await User.findOne({email})
        if (!isExistUser)
            throw new AppError('Tài khoản không tồn tại', 404)
    }
}