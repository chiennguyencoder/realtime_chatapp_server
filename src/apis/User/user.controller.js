import { AppError } from "../../middleware/ErrorHandler.js";
import UserService from "./user.service.js";

class UserController {
    async getAllUser(req, res, next){
        try {
            const users = await UserService.getAllUser()
            return res.status(200).json({
                status : 'success',
                msg : 'Lấy dữ liệu người dùng thành công.',
                data : users,
                total : users.length
            })
        }
        catch(err){
            next(err)
        }
    }

    async getUserByID(req, res, next){
        try {
            const user = await UserService.getUserByID(req.params.id)
            return res.status(200).json({
                status : 'success',
                msg : 'Lấy dữ liệu người dùng thành công.',
                data : user
            })
        }
        catch(err){

        }
    }

    async createUser(req, res, next){
        try {
            const userData = req.body

            const createdUser = await UserService.createUser(userData)

            return res.status(200).json({
                status : 'Success',
                msg : 'Tạo người dùng thành công',
                data : createdUser
            })
        }
        catch(err){
            next(err)
        }
    }

    async deleteOne(req, res, next){
        try {
            const id = req.params.id
            const result = UserService.deleteUser(id)
            
            return res.status(200).json({
                status : 'success',
                msg : 'Xóa người dùng thành công!'
            })
        }
        catch(err){
            next(err)
        }
    }

}

export default new UserController()