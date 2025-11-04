import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Collect all images from req.files (image1, image2, etc.)
    const images = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0],
    ].filter(Boolean); // remove undefined

    // Upload to Cloudinary in parallel
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url; // HTTPS url
        } catch (err) {
          console.error("Cloudinary upload failed for", file.path, err);
          return null;
        }
      })
    );
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//funtion for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//function for removing product
const removeProduct = async (req, res) => {
  try {
    console.log("Remove request body:", req.body);
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//function for single product info
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);
//     res.json({ success: true, product });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


 const singleProduct = async (req, res) => {
  try {
    const { id } = req.params; // get product ID from URL
    const product = await productModel.findById(id).populate("reviews.user", "name");

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const addProductReview = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    
    const userId = req.body.userId;
    const user = await userModel.findById(userId);
    console.log(user);
    
    // FIX: Clean up existing invalid reviews before adding new one
    product.reviews = product.reviews.filter(review => 
      review.user && review.name && review.comment && !isNaN(review.rating)// Keep only reviews that have required fields
    );

    
    const alreadyReviewed = product.reviews.find(
      (r) => r.user?.toString() === userId,
      
    );
    console.log("Already reviewed:", alreadyReviewed)
    if (alreadyReviewed)
      return res.status(400).json({ success: false, message: "Product already reviewed" });
    

    // FIXED: Use userId for 'user' field and user.name for 'name' field
    const newReview = {
      user: userId,        // Schema expects ObjectId, not user object
      name: user.name,     // Use actual user's name from database
      rating: Number(rating),
      comment:comment,
    };
    console.log("NEW REVIEW OBJECT:", newReview)
    product.reviews.push(newReview);
     console.log("Reviews after push:", product.reviews);

    product.numReviews = product.reviews.length;
    // reduce() is a JavaScript array method that combines all items in an array into a single value.
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) //acc → accumulator (a running total)Start with acc = 0 Add the first item: 0 + 5 = 5 Add the next item: 5 + 4 = 9Add the last item: 9 + 3 = 12


      product.reviews.length;
    

    // FIX: Handle case when there are no reviews or rating is NaN
    const validReviews = product.reviews.filter(review => !isNaN(review.rating));
    if (validReviews.length > 0) {
      product.rating = validReviews.reduce((acc, item) => acc + item.rating, 0) / validReviews.length;
    } else {
      product.rating = 0; // Default when no valid reviews
    }
    await product.save();
    res.json({ success: true, message: "Review added successfully", product });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Server error while adding review" });
  }
};


export { listProducts, addProduct, removeProduct, singleProduct, addProductReview };
