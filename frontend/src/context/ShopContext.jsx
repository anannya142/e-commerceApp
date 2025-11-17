import { createContext, useState } from "react";
// import { products } from '../assets/assets';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const currency = "$";
 
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  // ------------------- CART -------------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};

      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  //  useEffect(()=>{
  //     console.log(cartItems);

  //  },[cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };


  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      // Find the product info
      const itemInfo = products.find(
        (product) => product._id.toString() === itemId
      );

      // If product not found, skip
      if (!itemInfo) continue;

      for (const variant in cartItems[itemId]) {
        if (cartItems[itemId][variant] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId][variant];
        }
      }
    }

    return totalAmount;
  };


  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      // const response = await axios.get(backendUrl + '/api/product/list');

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
      // console.log("API RESPONSE:", response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const addReview = async (productId, reviewData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/${productId}/reviews`, 
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  };
      // Fetch a single product
  const fetchProduct = async (productId) => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/single/${productId}`);
      const product = res.data.product;

      setProducts((prev) => {
        const exists = prev.find((p) => p._id === product._id);
        if (exists) {
          return prev.map((p) => (p._id === product._id ? product : p));
        } else {
          return [...prev, product];
        }
      });

      return product;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
   } 
   
   
  
  const value = {
    products,
    
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    addReview,
    fetchProduct,
    
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
