
// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       // ✅ Ensure the URL has a proper slash
//       const response = await axios.post(
//         `${backendUrl}/api/order/userorder`, 
//         {}, 
//         { headers: { token } }
//       );

//      if(response.data.success){
//       let allOrdersItem = []
//       response.data.orders.map((order)=>{
//         order.items.map((item)=>{
//           item['status'] = order.status
//           item['payment'] = order.payment
//           item['paymentMethod'] = order.paymentMethod
//           item['date'] = order.date
//           allOrdersItem.push(item)

//         })

//         setOrderData(allOrdersItem.reverse())

//       })
//      }

//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token, backendUrl]); // ✅ include backendUrl as dependency

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>
//       <div>
//         {orderData.map((item, index) => (
//           <div key={index} className="py-4 border-t borde-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"> 
//             <div className="flex items-stars gap-6 text-sm">
//               {/* <img className="w-16 sm:w-20" src={item.productId?.images?.[0]} alt={item.productId?.name} /> */}
//                  {/* Product Image */}
//                   <img
//                     src={item.productId?.images?.[0]}
//                     alt=""
//                     className="w-20 h-20 object-cover rounded"
//                   />
//               <div> 
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex-items-center gap-3 mt-1 text-base text-gray-700">
//                   <p>{currency}{item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span></p>
//                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
//               </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 squre-full bg-red-500"></p>
//                 <p className="text-sm md:text-base">{item.status}</p>
//               </div>
//             </div>
//             <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);

//   const [orderData, setOrderData] = useState([]);

//   // Load orders from backend
//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(
//         `${backendUrl}/api/order/userorder`,
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         setOrderData(response.data.orders || []);
//       } else {
//         toast.error(response.data.message || "Failed to load orders");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <Title text1="MY" text2="ORDERS" />
//       </div>

//       <div className="mt-6 flex flex-col gap-6">
//         {orderData.length === 0 && (
//           <p className="text-gray-500">You have no orders yet.</p>
//         )}

//         {orderData.map((order, index) => (
//           <div
//             key={index}
//             className="border p-4 rounded-lg shadow-sm flex flex-col gap-4"
//           >
//             {/* Order Header */}
//             <div className="flex justify-between text-sm text-gray-600">
//               <p>
//                 <b>Order ID:</b> {order._id}
//               </p>
//               <p>
//                 <b>Status:</b> {order.status}
//               </p>
//             </div>

//             {/* Order Items */}
//             <div className="flex flex-col gap-4">
//               {order.items.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex flex-col sm:flex-row gap-4 border-b pb-4"
//                 >
//                   {/* Product Image */}
//                   <img
//                     src={item.productId?.images?.[0]}
//                     alt={item.productId?.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />

//                   {/* Product Info */}
//                   <div className="flex-1">
//                     <p className="font-medium text-lg">
//                       {item.productId?.name}
//                     </p>
                    
//                      <div className="flex-items-center gap-3 mt-1 text-base text-gray-700">
//                      <p>{currency}{item.price}</p>
//                      <p>Quantity: {item.quantity}</p>     
//                     </div>
                     
//                     {item.size && (
//                       <p className="text-gray-500">Size: {item.size}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Footer */}
//             <div className="flex justify-between text-sm text-gray-600">
//               <p>
//                 <b>Placed on:</b>{" "}
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//               <p>
//                 <b>Total:</b> {currency}
//                 {order.amount}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorder`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // ✅ Flatten orders and group by product
        //We create an empty array groupedOrders where we will store the final processed data to display in the frontend.
        const groupedOrders = [];
        //Loop through each order

        response.data.orders.forEach(order => {
          const map = new Map();
          order.items.forEach(item => {
            const id = item.productId._id;
            if (!map.has(id)) {
              map.set(id, {
                product: item.productId,
                sizes: [item.size],
                quantities: [item.quantity],
                price: item.price,
                status: order.status,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.date,
              });
            } else {
              const existing = map.get(id);
              existing.sizes.push(item.size);
              existing.quantities.push(item.quantity);
            }
          });
          groupedOrders.push(...map.values());
        });

        setOrderData(groupedOrders.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to load orders');
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="sm:text-base font-medium">{item.product.name}</p>
                <div className="flex gap-3 mt-1 text-base text-gray-700">
                  <p>{currency}{item.price}</p>
                  <p>Sizes: {item.sizes.join(', ')}</p>
                  <p>Quantities: {item.quantities.join(', ')}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 squre-full bg-red-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
            <button
              onClick={loadOrderData}
              className="border px-4 py-2 text-sm font-medium rounded-sm"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
