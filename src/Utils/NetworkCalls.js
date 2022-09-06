import axios from "axios";
import callToastify from "./toast";
import { Backend } from "../api";

const networkCall = async (route, method, data) => {
  switch (method) {
    case "GET":
      try {
        return await axios({
          method: "get",
          url: `${Backend}${route}`,
        });
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }

      break;

    case "POST":
      try {
        return await axios({
          method: "post",
          url: `${Backend}${route}`,
          data: data,
        });
      } catch (err) {
        return err.response;
      }

    case "PUT":
      try {
        return await axios({
          method: "put",
          url: `${Backend}${route}`,
          data: data,
        });
      } catch (err) {
        return err.message;
      }

    case "DELETE":
      try {
        return await axios({
          method: "delete",
          url: `${Backend}${route}`,
        });
      } catch (err) {
        return err.message;
      }

    default:
      break;
  }
};

const defaultHeaderForToken = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
};

const getUserCart = async (dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const { data } = await networkCall("/cart", "GET");
    dispatch({ type: "SET_CART", payload: data.userCart });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  dispatch({ type: "SET_LOADING" });
};

const addToCart = async (event, productID, dispatch, isLoggedIn) => {
  dispatch({ type: "SET_LOADING" });
  event.preventDefault();

  if (isLoggedIn) {
    try {
      const { data } = await networkCall(`/cart/${productID}`, "POST");
      if (data.success) {
        dispatch({ type: "SET_CART", payload: data.response });
        callToastify(" 🛒 Added to cart!");
      } else {
        callToastify("Already in cart !");
      }
    } catch {
      callToastify("Something went wrong ! Try Again");
    }
  } else {
    callToastify("You are not logged in", "Error");
  }

  dispatch({ type: "SET_LOADING" });
};

const modifyCartItemsQty = async (event, type, productID, dispatch) => {
  dispatch({ type: "SET_LOADING" });
  event.preventDefault();
  const response = await networkCall(`/cart/${productID}`, "PUT", type);
  dispatch({ type: "SET_CART", payload: response.data.userCart });
  dispatch({ type: "SET_LOADING" });
};

const removeItemFromCart = async (event, productID, dispatch) => {
  dispatch({ type: "SET_LOADING" });
  event.preventDefault();
  const { data } = await networkCall(`/cart/${productID}`, "DELETE");
  dispatch({ type: "SET_CART", payload: data.userCart });
  dispatch({ type: "SET_LOADING" });
};

const addToWishlist = async (event, productID, dispatch, isLoggedIn) => {
  dispatch({ type: "SET_LOADING" });
  event.preventDefault();
  if (isLoggedIn) {
    try {
      const { data } = await networkCall(`/wishlist/${productID}`, "POST");
      if (data.success) {
        dispatch({ type: "SET_WISHLIST", payload: data.response });
        callToastify(" 💜 Added to wishlist");
      } else {
        callToastify(data.message);
      }
    } catch {
      callToastify("Something went wrong ! Try Again");
    }
  } else {
    callToastify("You are not logged in", "Error");
  }

  dispatch({ type: "SET_LOADING" });
};

const getUserWishlist = async (dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const { data } = await networkCall("/wishlist", "GET");
    dispatch({ type: "SET_WISHLIST", payload: data.userWishlist });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  dispatch({ type: "SET_LOADING" });
};

export {
  networkCall,
  defaultHeaderForToken,
  getUserCart,
  addToCart,
  addToWishlist,
  modifyCartItemsQty,
  removeItemFromCart,
  getUserWishlist,
};
