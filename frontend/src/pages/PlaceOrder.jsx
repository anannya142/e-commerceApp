import React, { useState,useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const {navigate,backendUrl,token, cartItems,setCartItems,getCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext);
  const [formData, setFormData]= useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city: '',      
    state: '',
    zipcode:'',
    country:'',
    phone:'',

  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;


    setFormData(data=>({...data,[name]: value}))


  }

const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    // Prepare order items from cart
    let orderItems = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            orderItems.push({
              productId: product._id,
              size,
              quantity,
              price: product.price,
            });
          }
        }
      }
    }

    // Prepare order data
    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
      paymentMethod: method,
    };

    // Switch based on payment method
    if (method === "cod") {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        // { headers: { token } }
        {headers: {
          authorization: `Bearer ${token}`,
        }},
       

      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success("Order placed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } else if (method === "stripe") {
      const response = await axios.post(
        `${backendUrl}/api/order/stripe`, // ⚠ Make sure backend route is /stripe
        orderData,
        // { headers: { token } }
          {headers: {
          authorization: `Bearer ${token}`,
        }},
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Order failed, please try again.");
  }
};

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} Text2={'INFORMATION'}/>

        </div>
        <div className='flex gap-3'>
           <input required onChange={onChangeHandler} name='firstName'  value= {formData.firstName}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='First name'/> 
           <input required  onChange={onChangeHandler} name='lastName'  value= {formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='Last name'/>
        </div>
          <input required onChange={onChangeHandler} name='email'  value= {formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "email" placeholder='Email address'/>
          <input required  onChange={onChangeHandler} name='street'  value= {formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='Street'/>
        <div className='flex gap-3'>
           <input required  onChange={onChangeHandler} name='city'  value= {formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='City'/>
           <input required  onChange={onChangeHandler} name='state'  value= {formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
           <input required  onChange={onChangeHandler} name='zipcode'  value= {formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "number" placeholder='Zipcode'/>
           <input required  onChange={onChangeHandler} name='country'  value= {formData.country}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type= "text" placeholder='Country'/>
        </div>
          <input required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='phone'  value= {formData.phone} type= "number" placeholder='Phone'/>

      </div>
      {/*-------------- right side -------------------------*/}
      <div  className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} Text2={'METHOD'}/>
          {/*------------- payment method selection ------------*/}
          <div  className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5  h-3.5  border round-full ${method === 'stripe' ? 'bg-red-400':''} `}></p>
              <img className = 'h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            {/* <div onClick={()=>setMethod('rezorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5  h-3.5  border round-full ${method === 'rezorpay' ? 'bg-red-400': ''}`}></p>
              <img className = 'h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}

            
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
              <p className={`min-w-3.5  h-3.5  border round-full ${method === 'cod' ? 'bg-red-400' : ''}`}></p>
              <p className='text-gray-50-0 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

         </div>
         <div className='w-full text-end mt-8'>
          <button  type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

         </div>

        </div>

      </div>
    </form>
  )
}

export default PlaceOrder