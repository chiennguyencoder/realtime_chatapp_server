import mongoose from 'mongoose'
import 'dotenv/config'

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Kết nối CSDL MongoDB thành công.')
    }
    catch(err){
        console.log('❌ Kết nối CSDL MongoDB thất bại.')
    }
}

export { connect }