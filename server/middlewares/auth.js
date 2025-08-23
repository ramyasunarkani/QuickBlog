import jwt from "jsonwebtoken";

const auth=async (req,res,next)=>{
     const token=req.headers.authorization;       
       try{
        if(!token){
            return res.status(400).json({
                success:false,
                message:"No token found"
            })
        }
        jwt.verify(token,process.env.JWT_SECRET);
        next();
       }catch(error){
          return res.status(500).json({
            success:false,
            message:error.message
          })
       }
}

export default auth;