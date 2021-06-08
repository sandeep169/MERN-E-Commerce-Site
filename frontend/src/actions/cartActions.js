import Axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstant";

//when we are defining action this async opeartion accept dispatch
export const addToCart = (productId, qty) => async(dispatch,getState)=> {
    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            name:data.brand,
            image:data.image,
            price : data.price,
            countInStock: data.stock,
            product:data._id,
            qty,

        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
};
//this product : DATA._ID will be used to add in databases to add item

//after adding product to cart its going to save in our 
//local storage  and by refreshing the page it going to
//   persistence in our computer
