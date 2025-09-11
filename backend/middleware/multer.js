// import multer from "multer";
// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer ({storage})
// export default upload
// multer.js
// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null,file.originalname); // Make sure this folder exists
//     },
   
// });

// const upload = multer({ storage });

// export default upload;

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });
// export default upload;
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('.', 'uploads')); // ensure uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage });
export default upload;
