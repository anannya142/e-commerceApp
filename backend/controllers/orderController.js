import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe'
//import { currency } from "../../admin/src/App.jsx";

// global variables
const currency = 'eur'
const deliveryCharge = 10

//getway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY )


//placeing order using COD method
const placeOrder = async (req,res) =>{
    try {
        const {userId, items , amount ,address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date:Date.now(),

        }




        const newOrder = new orderModel(orderData)
        await newOrder.save();

        //clearing the cart data
        await userModel.findByIdAndUpdate(userId,{cartData: {}})
        res.json({success:true,message: 'Order Placed'})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message});
        
    }

}
//----------------userOrders-----------------------
const userOrders = async (req,res) =>{
    try {
        const {userId} = req.body;
        //const orders = await orderModel.find({userId});
        const orders = await orderModel
            .find({ userId })
            .populate('items.productId', 'name images');


        //this is for debugging
        console.log({success:true,orders})
        res.json({ success: true, orders });
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}
//-----placeing order using COD method-------
const placeOrderStripe = async (req,res) =>{
try {
    const {userId , items, amount, address} = req.body
    const {origin} = req.headers;
    const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment:false,
            date:Date.now(),

        };
    const newOrder = new orderModel(orderData)
    await newOrder.save();
    //line item creating for payment

    const line_items = items.map((item) =>({
        price_data: {
            currency:currency,
            product_data: {

                name: item.productId?.name || "Unknown Product"


            },
            unit_amount: item.price * 100
        },
        quantity:item.quantity
    }));
    line_items.push({
        price_data: {
            currency:currency,
            product_data: {

                name:'Delivery Charges'

            },
            unit_amount: deliveryCharge * 100
        },
         quantity:1


    })
    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,

        line_items,
        mode: 'payment',

    })

    console.log("Stripe order created:", newOrder._id);

    res.json({success:true,session_url : session.url})

    
} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
    
}

}
//Verify stripe
const verifyStripe = async(req,res) =>{
    const {orderId, success,userId} = req.body;
    try {
        if(success=== "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData: {}});
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false})

        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
       
    
        
    }
}

//All Orders data for Admin panel
const allOrders = async (req, res) => {
  try {
    console.log("Admin route hit, token:", req.headers.token);
    const orders = await orderModel.find({})
     .populate('items.productId', 'name images');
    

    console.log("Orders fetched:", orders.length);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in allOrders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}







//User Order data for Fronend

//------update Order status from admin panel--------
const updateStatus = async(req,res)=>{
    try {
        const {orderId ,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }

}

export {placeOrder, placeOrderStripe,allOrders,userOrders,updateStatus,verifyStripe}; 