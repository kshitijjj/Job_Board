import express from 'express'
import strategy, { Strategy } from 'passport-google-oauth20'
import passport from 'passport'
import dotenv from 'dotenv'
import {userAuthModel,userModel} from '../models/model.js';
import bcrypt from 'bcrypt';
dotenv.config();

passport.use(new Strategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:'',
},async(accessToken,refreshToken,profile,done )=>{
    try {
        const email=profile.emails[0].value;
        const isemail=await userAuthModel.find({email});
        let newUser="";
        if(!isemail){
            newUser=new userAuthModel({name:profile.displayName,email:email,password:bcrypt.hash(Math.random(),10)});
            await newUser.save();
        }
        done(null,newUser);
    } catch (error) {
        console.log(error);
        done(error,null);
    }
}))
