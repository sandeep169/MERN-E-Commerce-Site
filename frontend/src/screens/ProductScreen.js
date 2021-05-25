
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from "../components/Rating";
// import data from "../data";


export default function ProductScreen(props) {
    
    const dispatch = useDispatch();
    const productId= props.match.params.id;
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
    },[dispatch, productId]);

    console.log(product);
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
                                    <li>Price : ${product.price}</li>
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
                                                <div className="price">${product.price}</div>
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
                                        <li>
                                            <button className="primary block" >Add to cart </button>
                                        </li>
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

