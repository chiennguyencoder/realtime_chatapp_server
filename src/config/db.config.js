import mongoose from 'mongoose'
import 'dotenv/config'

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connect MongoDB successfully!!!')
    }
    catch(err){
        console.log('Connect MongoDB failed!!')
    }
}

export { connect }