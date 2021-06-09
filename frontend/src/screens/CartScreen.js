import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  //array destructure of cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    //delete item from cart function
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                
                <div className="row">
                  <div>
                    <img
                      // src={`../${item.image}`}
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  
                  </div>
                  {/* this colum show product name */}
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    {/* this is third colum .. it should show select box to change the qty of item in cart screen*/}
                  </div>
                  
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >

                      {
                        //[...Array(product.countInStock).keys] assuming countInStock is 5
                        //then this fn will return an array from 0 to 5
                        //now i am gonna map it each element..
                        //this will add the total no of product in stock to in array and then
                        // through option total number of option will display to select the no of  items.
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                    </select>
                  
                  </div>
                   {/* forth colum showing the price  */}
                  <div>₹{item.price}</div>
                  
                  {/* last item delete column 5th */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ₹
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}