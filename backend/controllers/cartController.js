import userModel from "../models/userModel.js";

//  Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    


    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Added To Cart", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || cartData[itemId][size] === undefined) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, message: "Cart Updated", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
