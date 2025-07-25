import z from "zod"
export const loginValidate = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(1, "Password không được để trống")
})

export const registerValidate = z.object({
    username : z.string().min(1, 'Username không được để trống'),
    email : z.string().email('Email không hợp lệ'),
    password : z.string()
            .min(1, "Password không được để trống")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            'Password phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt')
})