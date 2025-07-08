import bcrypt from 'bcryptjs'

class HashProvider {
    async generateHash (plainText) {
        const salt  = await bcrypt.genSalt(10)
        const hash =  await bcrypt.hash(plainText, salt)
        return hash
    }

    async compareHash (plainText, hashPassword) {
        return await bcrypt.compare(plainText, hashPassword)
    }
}

export default new HashProvider()