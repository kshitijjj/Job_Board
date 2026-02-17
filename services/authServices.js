import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userAuthModel from '../models/userAuthModel.js';
dotenv.config();

const getSignupUser=async({name,email,password,role})=>{
    try {
        const isemail=await userAuthModel.findOne({email});
        if(isemail){
            return {message:"Email already exists"};
        }
        if(email===process.env.admin_email)role='Admin'
        const ispassword=await bcrypt.hash(password,10);
        const newUserAuth=new userAuthModel({name:name,email:email,password:ispassword,role:role});
        await newUserAuth.save();
        const token=await jwt.sign({userId:newUserAuth._id,name:newUserAuth.name,email:newUserAuth.email,role:newUserAuth.role},process.env.SECRET_KEY);
        return {message:"New user Signup Successfully","token":token};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getLoginUser=async({email,password})=>{
    try {
        const isemail=await userAuthModel.findOne({email});
        if(!isemail){
            return {message:"Email does not exists please login with different email"};
        }
        const ispassword=await bcrypt.compare(password,isemail.password);
        if(!ispassword){
            return {message:"Invalid password"};
        }
        const token=await jwt.sign({userId:isemail._id,name:isemail.name,email:isemail.email,role:isemail.role},process.env.SECRET_KEY);
        return {message:"user login successfully!",token:token};
    } catch (error) {
        console.log(error);
        return null;
    }
}

const oauthResponse=async(user)=>{
    try {
        const token=jwt.sign({userId:user._id,name:user.name,email:user.email,role:user.role},process.env.SECRET_KEY);
        return {message:{name:user[0].name,email:user[0].email},"token":token};
    } catch (error) {
        console.log(error);
        return null;
    }
}


export default {getSignupUser,getLoginUser,oauthResponse};