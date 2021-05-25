// import data from './data'; no need it now  it was for static data
import {applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {productDetailsReducer, productListReducer} from './reducers/productReducers';
const initialState ={};

//reducer is fn which accept two parameter state and action
//now removing static reducer,,will fetch dynamic reducer
// const reducer = (state,action) =>{
//     return {product : data.products};
// };
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;