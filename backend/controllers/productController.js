import productModel from "../models/productModel.js";
import {v2 as cloudinary} from  "cloudinary";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Collect all images from req.files (image1, image2, etc.)
    const images = [req.files.image1?.[0], req.files.image2?.[0], req.files.image3?.[0], req.files.image4?.[0]]
      .filter(Boolean); // remove undefined

    // Upload to Cloudinary in parallel
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
          return result.secure_url; // HTTPS url
        } catch (err) {
          console.error("Cloudinary upload failed for", file.path, err);
          return null;
        }
      })
    )
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
const listProducts = async (req,res)=>{

  try{const products = await productModel.find({});
  res.json({success:true,products})

  }catch(error){

      console.log(error)
      res.json({success:false,message:error.message})


  }

}
//function for removing product
const removeProduct = async (req,res)=>{

  try{
    console.log("Remove request body:", req.body);
    await productModel.findByIdAndDelete(req.body.id);
  res.json({success:true,message: "Product Removed"})

  }catch(error){

      console.log(error)
      res.json({success:false,message:error.message})


  }

}
//function for single product info
const singleProduct = async (req,res)=>{
    try{ 

      const { productId } = req.body;
      const product = await productModel.findById(productId)
      res.json({success:true,product})

  }catch(error){

      console.log(error)
      res.json({success:false,message:error.message})


  }

}


export {listProducts,addProduct,removeProduct,singleProduct};

