import mongoose from "mongoose";

// Step 1: Define a sub-schema for individual reviews
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // link to your User model
    },
    name: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true 
    },
    comment: { 
      type: String, 
      required: true 
    },
 
  },
  { timestamps: true } // adds createdAt, updatedAt automatically
);
const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true},
    description:{
        type:String, 
        required:true},
    price: {
        type:Number,
        required:true },

    images: { type: [Array], required: true },
    category: {
        type:String, 
        required:true},
    subCategory: {
        type:String, 
        required:true},
    sizes: {
        type:Array, 
        required:true},
    bestseller: {
        type:Boolean},
    date: {
        type: Number, 
        required:true},
        // Step 3: Add review-related fields 👇
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },



})

//using this screama create the model and stored it in product model
const productModel =mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;