import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const updateStock = async () => {
  try {
    await connectDB();

    // Add countInStock = 20 to all products
    await Product.updateMany({}, { $set: { countInStock: 20 } });

    console.log("Stock field added to all products!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateStock();
