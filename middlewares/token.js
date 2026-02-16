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

export default verifyToken;