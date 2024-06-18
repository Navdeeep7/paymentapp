const {JWT_SECRET}=require("../config");
const jwt=require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
      
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({msg:"wrong token",success:false});
    }
    const token=authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
         
        req.userId = decoded.uid; 
        
        next();
    } catch (err) {
        return res.json({success:false}); 
    }

 
  

 
}
module.exports = {
    authMiddleware
}