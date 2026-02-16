import mongoose, { mongo, Schema } from "mongoose";

const userSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'userAuthModel'
    },
    dob:{
        type:Date,
        required:true
    },
    qualification:[{
        course:{
            type:String,
            required:true
        },
        organisationName:{
            type:String,
            required:true
        },
        percentage:{
            type:Number,
            required:true
        }
    }],
    skills:[{
        type:String,
    }]
})

const userModel=mongoose.model('userModel',userSchema);
export default userModel;