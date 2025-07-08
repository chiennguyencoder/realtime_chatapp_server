import { AppError } from '../../middleware/ErrorHandler.js'
import User from '../../models/user.model.js'
import { ObjectId } from 'mongodb'
import * as UserValidate from '../../validation/user.validator.js'


class UserService {
    // 1. Lấy tất cả dữ liệu người dùng
    async getAllUser(){
        const users = await User.find().select('-password')
        return users
    }

    // 2. Lấy dữ liệu người dùng theo user id
    async getUserByID(userID){
        const user = await User.findById(userID).select('-password')
        return user
    }

    // 3. Tạo một người dùng mới
    async createUser(userData){
        const result = UserValidate.createUser.safeParse(userData)
        if (!result.success){
            throw result.error
        }

        const isExistingUser = await User.findOne({ email : userData.email})
        if (isExistingUser)
            throw new AppError('Email này đã tồn tại.', 400)

        const newUser = await User.create(userData)
        const {password, ...safeUser} = newUser.toObject()
        return safeUser;
    }

    // 4. Xóa người dùng
    async deleteUser(userID){
        const user = await User.findByIdAndDelete(new ObjectId(userID))

        if ( !user )
            throw (new AppError('Người dùng không tồn tại.', 404))

        return user
    }
}

export default  new UserService()