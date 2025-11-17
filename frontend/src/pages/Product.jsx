import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
// import Rating from "../components/Rating";
import Reviews from "../components/Reviews"
import Rating from '../components/Rating';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, fetchProduct } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');



  useEffect(() => {
    const loadProduct = async () => {
      const product = products.find((p) => p._id === productId) || (await fetchProduct(productId));
      setProductData(product);
      setMainImage(product?.images?.[0] || "");
    };
    loadProduct();
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-50 text-center py-20">Loading product...</div>;
  }


  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500">
      {/* Product Details */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer hover:scale-110 transition"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={mainImage} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
        
            
           <Rating value={productData.rating || 0} />
           <p className="pl-2 text-gray-600 text-sm">
             ({productData.numReviews || 0} Reviews)
            </p>
          </div>

          {/* </div> */}

          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">{productData.description}</p>
           <p className="mt-2 text-gray-500 md:w-4/5"><strong>Only {productData.countInStock} is available!</strong></p>
           
    

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 bg-gray-100 ${size === selectedSize ? 'border-orange-500' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20 ">
        <div className="flex">
          <b className="border border-gray px-5 py-3 font-bold text-xl">Description</b>
       </div>
        <div className="flex flex-col gap-4 border border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
        <div  className="flex flex-col gap-4 border border-gray px-6 py-6 text-sm text-gray-500">   
          <p className="border px-5 py-3 font-bold text-xl">
           Product Review
          </p>
          <Reviews productId={productData._id} 
          

          />
        </div>


       
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
