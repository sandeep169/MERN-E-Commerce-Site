import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from "../components/Rating";
// import data from "../data";


export default function ProductScreen(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    console.log(props.match.params.id);
    // let { id } = useParams(); // import useParams from react-router-dom
    // a type casting is done to get id as number Number(id);
    // const product = data.products.find((x)=>x._id===Number(id));

    //now we not gonna show product from static file ,
    // before_reduxUpdate : // const product = data.products.find((x) => x._id === Number(Props.match.params.id));

    //*******Either we can use react-router-dom library to get product id from url Or we can use obj passed to ProductScreen rg (props) from app.js when it called..********
    //    we going to show product form productDetail from redux store
    const productDetails = useSelector((state) => state.productDetails);

    const { loading, error, product } = productDetails;

    //before_reduxUpdate : //no need this line any more
    // if (!product) {
    //     return <div>No Product Found</div>
    // }
    //    const img =  require('../../public/images/p1.jpg');
    //we need to dispatch detailsProduct in useEffect()
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    function addToCartHandler() {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    return (
        <>
            <div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <Link to="/">Back to Result</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large"
                                    src={`../${product.image}`}
                                    alt={product.name}
                                />
                                {/* as path was looking in src folder but image is in one step back in public/image  so manually path set {../$} */}
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li key={product._id}>
                                        <Rating key={product._id}
                                            rating={product.rating}
                                            numReviews={product.numReviews}>
                                        </Rating>
                                    </li>
                                    <li>Price : ₹{product.price}</li>
                                    <li>
                                        Description :
                                         <p>{product.description} </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">₹{product.price}</div>
                                            </div>

                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status :</div>
                                                <div>
                                                    {product.countInStock > 0 ?
                                                        (<span className="success">In Stock</span>) :
                                                        (<span className="danger">UnAvailable </span>)}

                                                </div>
                                            </div>
                                        </li>
                                        {/* adding a conditional rendering  */}
                                        {product.countInStock > 0 && (
                                            <>
                                                {/* //to choose number of item . select box  */}
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    //[...Array(product.countInStock).keys] assuming countInStock is 5
                                                                    //then this fn will return an array from 0 to 5
                                                                    //now i am gonna map it each element..
                                                                    //this will add the total no of product in stock to in array and then
                                                                    // through option total number of option will display to select the no of  items.
                                                                    [...Array(product.countInStock).keys()].map(
                                                                        x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                        )
                                                                    )}
                                                            </select>
                                                        </div>

                                                    </div>

                                                </li>


                                                {/* // putting add cart button inside this block to not display for non existence product, empty product  */}
                                                <li>
                                                    <button
                                                        onClick={addToCartHandler}
                                                        className="primary block" >Add to cart </button>
                                                </li>
                                            </>
                                        )}


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>


        </>
    )
}

 //before_reduxUpdate : return 
            //    {/* <div className="row center">
            //         {products.map((product) => (<>
            //             <Product key={product._id} product={product}></Product>
            //             {/* <Rating key={}{}></Rating> }///
            //         </>
            //         ))}
            //     </div>
            //     //<!--***end of row center**-->
            //      */}