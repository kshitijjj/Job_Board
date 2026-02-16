import jwt from 'jsonwebtoken';

const verifyToken=async(req,res,next )=>{
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(404).json({message:"Token not found"});
    }
    try {
        const token=authHeader.split(' ')[1];
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}

const restrictedAccess=async(req,res,next)=>{
    if(!req.user){
        return res.status(401).json({message:"user not found"});
    }
    if(req.user.role=='Applicant'){
        return res.status(401).json({message:"not authorised"});
    }
    if(req.user.role=='Admin' || req.user.role=='Recruiter'){
        return next();
    }
    else{
        return res.status(403).json({message:'Not Authorised'});
    }
}

export default verifyToken;