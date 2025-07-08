import { z } from 'zod'
import { ObjectId } from 'mongodb'

const createUser = z.object({
    username : z.string().min(1, 'Username is required'),
    email : z.string().email('Email không hợp lệ'),
    password : z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
        'Password phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt')
})

const isObjectID = z.object({
    id : z.instanceof(ObjectId)
})

export {createUser, isObjectID}