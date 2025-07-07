import mongoose from "mongoose";
import { Schema } from "mongoose";
import hashProvider from "../provider/hash.provider.js";

const UserSchema = new Schema(
    {
        email : { type: String, required : true },
        username : { type : String, required : true },
        password : { type : String, required : true },
        avatar : { type : String, default : '', required : false},
        friends : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : false
        }],
        createdAt : { type : Date, default: Date.now}
    },
    { timestamps: true }
)

// check hashing password before save to database
UserSchema.pre('save', async (next) => {
    try {
        this.password = await hashProvider.generateHash(this.password)
        next()
    }
    catch(err){
        next(err)
    }
})

const User = mongoose.model('User', UserSchema)

export default User