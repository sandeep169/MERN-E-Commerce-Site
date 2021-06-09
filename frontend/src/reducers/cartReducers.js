import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const cartReducer=( state = { cartItems:[] }, action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem){
                //i am not gonna change other property and updating cart items
               return {
                    ...state,
                    cartItems: state.cartItems.map( x =>
                        x.product === existItem.product? item : x
                        ),

                };
            }
            else{
                return{
                    ...state,cartItems:[...state.cartItems, item]
                }
            }
        case  CART_REMOVE_ITEM :
            return{
                //filtering out the product that its id is equal to action.payload
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
        default: return state;
    }

}