import mongoose from "mongoose";
import { Schema } from "mongoose";
import hashProvider from "../provider/hash.provider.js";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        createdAt: { type: Date, default: Date.now },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },

        provider: {
                type: String,
                enum: ['google', 'local'],
                default: 'local'
        },

        profile: {
            avatar: {
                type: String,
                default: ""
            },
            gender: {
                type: String,
                enum: ["male", "female", "other"],
                default: "other"
            },
            phone: {
                type: String,
                default: ""
            },
            dateOfBirth: {
                type: Date,
                default: null
            },
        },

        passwordResetToken : {
                type : String,
                select : false
            },

        passwordResetExpires: {
            type : Date,
            select : false
        },

        location: {
            country: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            },
            address: {
                type: String,
                default: ""
            }
        },
        
        emailVerification: {
            token: {
                type: String,
                select: false
            },
            emailVerificationExpires: {
                type: Date,
                select: false
            },
            isEmailVerified: {
                type: Boolean,
                default: false,
            }
        }
    },
    { timestamps: true }
)

// Check hashing password before save to database
UserSchema.pre('save', async function(next){
    try {
        console.log('Hash password')
        this.password = await hashProvider.generateHash(this.password)
        next()
    }
    catch(err){
        next(err)
    }
})

const User = mongoose.model('User', UserSchema)

export default User