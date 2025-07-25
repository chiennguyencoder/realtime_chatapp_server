import mongoose from 'mongoose'
import 'dotenv/config'

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ MongoDB database connection successful.')
    }
    catch(err){
        console.log('❌ MongoDB database connection failed.')
    }
}

export { connect }