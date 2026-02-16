import authServices from "../services/authServices.js";
const {getSignupUser,getLoginUser}=authServices;

const authSignup=async(req,res)=>{
    try {
        const user=await getSignupUser(req.body);
        return res.status(201).json({message:user.message,token:user.token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const authLogin=async(req,res)=>{
    try {
        const user=await getLoginUser(req.body);
        return res.status(201).json({message:user.message,token:user.token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export default {authLogin,authSignup};