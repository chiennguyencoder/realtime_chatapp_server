/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const generateAccessToken = async (userData) => {
    return new Promise((resolve, reject) => {
        const payload = { userData }

        // Debugging statement removed to avoid logging sensitive information

        const secret = process.env.ACCESS_TOKEN_SECRET || ""
        const options =  {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN || "10m"
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            else if (token){
                resolve(token)
            }
            else reject(new Error('Tạo accessToken thất bại'))
        })
    })
}

export default generateAccessToken


