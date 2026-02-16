import authServices from "../services/authServices.js";

const {getSignupUser,getLoginUser,oauthResponse}=authServices;

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

const googleOauth=async(req,res)=>{
    try {
        const user=req.user;
        const googleResponse=await oauthResponse(user);
        return res.status(200).json({message:googleResponse.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
}

export default {authLogin,authSignup,googleOauth};