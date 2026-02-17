import {Strategy} from 'passport-google-oauth20'
import passport from 'passport'
import dotenv from 'dotenv'
import userAuthModel from '../models/userAuthModel.js';
import bcrypt from 'bcrypt';
dotenv.config();

passport.use(new Strategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:'http://127.0.0.1:3000/user/auth/google/callback',
},async(accessToken,refreshToken,profile,done )=>{
    try {
        const email=profile.emails[0].value;
        const isemail=await userAuthModel.find({email});
        let newUser;
        if(!isemail){
            newUser=new userAuthModel({name:profile.displayName,email:email,password:bcrypt.hash(Math.random(),10)});
            await newUser.save();
        }
        else{
            newUser=isemail;
        }
        done(null,newUser);
    } catch (error) {
        console.log(error);
        done(error,null);
    }
}))
