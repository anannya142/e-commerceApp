
import jwt from "jsonwebtoken";


//It will run before the protected route (like /add-product), and it decides whether the request is allowed to continue (next()) or not.
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }

    //jwt.verify does two things:Checks if the token is valid and not expired.
    //Decodes the payload (the data you put inside when you signed the token at login).

    
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //Here we check if the email inside the token payload matches the admin email stored in .env.

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;









// import jwt from 'jsonwebtoken';

// const adminAuth = async (req,res,next) => {
//     try{
//         const {token} = req.headers
//         if(!token) {
//             return res.json({success:false, message:"Not Authorized Login again"})
//         }
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
  
//         if(token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//              return res.json({success:false, message:"Not Authorized Login again"})

//         }
//         next()
//     }catch(error){

//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export default adminAuth;