// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {
//   const {productId} = useParams();
//   const{products,currency,addToCart} = useContext(ShopContext);
//   const[productData,setProductData]= useState(false);
//   const[image,setImage] = useState('')
//   const[size,setSize] = useState('');


// const fetchProductData = async() =>{
//   products.map((item)=>{
//     if(item._id=== productId){
//       setProductData(item);
//       setImage(item.image[0])
     
//       return null;
//     }
//   })

//   }
//   useEffect(()=>{
//     fetchProductData();

//   },[productId]);
  
//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opasity ease-in duration-500 opacity-100'>
//       {/* Product data */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/* Product imagess */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//              {
//                 productData.image.map((item,index)=>(
//                  <img  onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'alt=""/>
//                 ))
//              }
//            </div>
//            <div className='w-full sm:w-[80%]'>
//              <img className="w-full h-auto" src={image} alt=""/>
//            </div>
//         </div>
//           {/* Product Info */}
//         <div className='flex-1'>
//             <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//             <div className='flex items-center gap-1 mt-2'>
//                <img src={assets.star_icon} alt="" className=''/>
//                <img src={assets.star_icon} alt="" className=''/>
//                <img src={assets.star_icon} alt="" className=''/>
//                <img src={assets.star_icon} alt="" className=''/>
//                <img src={assets.star_dull_icon} alt="" className=''/>
//                <p className='pl-2'>(122)</p>
//             </div>
//             <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
//             <p className='mt- text-gray-500 md:w-4/5'>{productData.description}</p>
//             <div className='flex flex-co gap-4 my-8'>
//               <p>Select Size</p>
//               <div className='flex gap-2'>
//                 {productData.sizes.map((item,index)=>(
//                   <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100  ${item=== size ? 'border-orange-500'  : ''}`}  key={index}>{item}</button>
//                 ))}

//               </div>
//             </div>
//           <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
//           <hr className='mt-8 sm:w-4/5'/>
//           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy return and exchange policy within 7 days.</p>

//           </div>
//         </div>
//      </div>
//      {/* -----------Description & Review Section */}
//      <div className='mt-20'>
//       <div className='flex'>
//         <b className='border px-5 py-3 text-sm'>Description</b>
//         <p className='border px-5 py-3 text-sm'>Reviews</p>

//       </div>
//       <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//         <p>Make enterprise commerce effortless with unified UI/UX and out-of-the-box native features. Your teams can build experiences customers will love on a platform built for enterprise.Enjoy Reliability and Flexibility on One of the World’s Most Scalable Platforms. Your Brand Deserves The Best Global Platform Out There, Not An Add-On To A Suite. Educational Resources. Level 1 Web Security. Customisable Platform.</p>
//         <p>Enjoy Reliability and Flexibility on One of the World’s Most Scalable Platforms. Your Brand Deserves The Best Global Platform Out There, Not An Add-On To A Suite. Educational Resources. Level 1 Web Security. Customisable Platform.</p>
//       </div>
//      </div>
//      {/*------------------------ Related products */}
//      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

//     </div>
//   ) : <div className='opacity-0'></div>
// }

// export default Product;


import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Fetch the product from the context
  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setMainImage(product.images?.[0] || ''); // Safe fallback
    }
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
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">{productData.description}</p>

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
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
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
