import mongoose, { mongo } from 'mongoose'

const userAuthSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    }
})
const userAuthModel=mongoose.model('userAuthModel',userAuthSchema);
export default userAuthModel;
