import mongoose from "mongoose";
import { Schema } from "mongoose";
import hashProvider from "../provider/hash.provider.js";

const UserSchema = new Schema(
    {
        email : {
            type: String,
            required : true,
            unique : true
        },
        username : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true,
            select : false
        },
        avatar : { 
            type : String, 
            default : '', 
            required : false},
        friends : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : false
        }],
        createdAt : { type : Date, default: Date.now},
        role : {
            type : String,
            enum : ['user', 'admin'],
            default : 'user',
            required : true
        }
    },
    { timestamps: true }
)

// Check hashing password before save to database
UserSchema.pre('save', async function(next){
    try {
        console.log(this.password)
        this.password = await hashProvider.generateHash(this.password)
        next()
    }
    catch(err){
        next(err)
    }
})

const User = mongoose.model('User', UserSchema)

export default User