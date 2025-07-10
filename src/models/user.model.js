import mongoose from "mongoose";
import { Schema } from "mongoose";
import hashProvider from "../provider/hash.provider.js";

const UserSchema = new Schema(
    {
        email : {
            type: String,
            required : true,
            format : 'email',
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
        },
        
        profile : {
            avatar : {
                type : String,
                default : ""
            },
            gender : {
                type : String,
                enum : ["male", "female", "other"],
                default : ""
            },
            phone : {
                type : String,
                defautl : ""
            },
            dateOfBirth : {
                type : Date,
                default : null
            },

            location : {
                country : String,
                city : String,
                address: String
            }
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