import multer from "multer";
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer ({storage})
export default upload
// multer.js
// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null,file.originalname); // Make sure this folder exists
//     },
   
// });

// const upload = multer({ storage });

// export default upload;
