// import jwt from 'jsonwebtoken'

// const authUser = async (req,res,next)=>{
//     const {token} = req.headers;
  
//     if(!token){

//         return res.json({success: false, message: 'Not Authorized Login Again'})

//     }
//     try{
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id;

//         next()
//     }catch(error){
//         console.log(error)
//         res.json({success: false, message:error.message})

//     }
// }

// curl -X POST http://localhost:4000/api/cart/add -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYxNzA2NTAxY2Q2ZmRiYWY5ODJjOCIsImlhdCI6MTc2MjAxMjgxMH0.cAIZ98_6KTLcgmRuI2k8pL_BkpYU2YGgi1_DekjvWdo" -F "itemId=68ab6faeadb7891ff63b75cc" -F "size=M"

// export default authUser;
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        //===============================================
              // FIX: Ensure req.body exists before setting userId
        if (!req.body) {
            req.body = {};
        }
        // ================================================
        req.body.userId = token_decode.id; // attach userId to request body
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
