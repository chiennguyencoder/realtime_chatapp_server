import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from './ErrorHandler.js'

export const verifyAccessToken = async (req, res, next) => {
    try {
        if (!req.headers['authorization']){
            return next(new AppError('Chưa xác thực (Thiếu accessToken)', 401))
        }

        const headers = req.headers['authorization']
        const token = headers.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, payload) => {
            if (err){
                if (err.name == 'TokenExpiredError'){
                    return next(new AppError('Access Token Expired!', 401))
                }
                return next(new AppError('Invalid Access Token.', 401))
            }

            req.user = payload
        })
        return next()
    }
    catch(err){
        return next(new AppError('Xác thực người dùng thất bại.', 401))
    }
}