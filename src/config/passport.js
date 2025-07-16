import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user.model.js";

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
}, async (accessToken, profile, done) => {
    try {

    }
    catch(err){
        
    }
}))