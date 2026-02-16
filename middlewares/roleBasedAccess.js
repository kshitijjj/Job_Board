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

export default restrictedAccess;