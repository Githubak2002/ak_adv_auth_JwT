import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
  const token = req.cookies.token;
  // const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
  // console.log("token: ",token);
  if(!token) 
    return res.status(401).json({message: "Unauthorized - No token"});

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);    
    // console.log("decoded → ",decoded);
    // paylod - {userId}, iat,exp
    req.userId = decoded.userId;
    // console.log("req.userId → ",req.userId);

    if(!decoded)
      return res.status(401).json({success:false, message: "Unauthorized - Invalid token"});
    next();
  } catch (error) {
    console.log("Error in verify Token → ",error);
    return res.status(500).json({success:false, message: "Error verifying token"});
  }
}