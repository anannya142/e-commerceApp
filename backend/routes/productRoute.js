import express from 'express';
import {listProducts,addProduct,removeProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import { addProductReview } from "../controllers/productController.js";

const productRouter = express.Router();

//  productRouter.post('/add',upload.array([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addProduct);
// productRouter.post('/add',adminAuth, upload.array('images', 4), addProduct)

// Admin routes to add product/POST request
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);
productRouter.post('/remove',adminAuth, removeProduct);
// Product routes GET request for home page
productRouter.get('/single/:id', singleProduct);
//for fatching products GET request
productRouter.get('/list', listProducts);
// Add review (authenticated users only)
// POST request single product by id with reviews
productRouter.post("/:id/reviews", upload.none(),authUser, addProductReview);

// New route for single product
productRouter.get('/single/:id', singleProduct);


export default productRouter;