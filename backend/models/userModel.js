import mongoose from "mongoose";
//create user schema
const userSchema = new mongoose.Schema({
    name: {type: String , required:true},
    email: {type: String , required:true ,unique:true},
    password: {type: String , required:true},
    cartData: {type: Object , default:{}},//mongoose neglect the property because its an empty object which is created when a  user make his cart
} , {minimize : false})


//model using sceama

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;