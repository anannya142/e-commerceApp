import React, { useContext } from "react";

import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

// const ProductItem = ({id,image,name,price}) => {
//     const{currency} = useContext(ShopContext);
//   return (
//    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//     <div className='overflow-hidden'>
//         <img className='hover:scale-110 transition ease-in-out'src={image[0]} alt=''/>
//     </div>
//     <p className='pt-3 pb-1 text-sm'>{name}</p>
//     <p className='text-sm font-medium'>{currency}{price}</p>
//    </Link>
//   )
// }

// export default ProductItem;
const ProductItem = ({ id, image, name, price, countInStock }) => {
  const { currency } = useContext(ShopContext);

  const imagesUrl = image?.[0] || "/placeholder.png"; // fallback if image is undefined

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={imagesUrl}
          alt={name || "Product"}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name || "Unnamed Product"}</p>
      <p className="text-sm font-medium">
        {currency}
        {price || 0}
      </p>

      <div>
        <p>Status:</p>
        <p>
          <strong>{countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
        </p>
      </div>
    </Link>
  );
};
export default ProductItem;
