import React, { useEffect, } from 'react';
//useState used for static data state : import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
// import axios from 'axios'; //used for static state
// import data from '../data';
// console.log(axios);
export default function HomeScreen() {
    const dispatch = useDispatch(); //hook in  react-redux
    // console.log(axios);
    //no need now 
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false)
    const productList = useSelector(state=>state.productList);
    const {loading,error,products} = productList;

    //three value from PL .. array destructuring.. unpacking value from array
    //useEffect will come in effect after rendering the ...it will be called firstly
    useEffect(() => {
        //dispatch an action which we gonna listProducts,its a function
        dispatch(listProducts());

        //used in static state data
        // const fetchData = async () => {
        //     try {
        //         setLoading(true);
        //         const { data } = await axios.get('/api/products'); //obj will from axios ,this will return  data 
        //         setLoading(false);
        //         setProducts(data);
        //     }catch (err) {
        //         setError(err.message);
        //         setLoading(false);
        //     }
        // };

        // fetchData();

    }, [dispatch]);



    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map((product) => (<>
                        <Product key={product._id} product={product}></Product>
                        {/* <Rating key={}{}></Rating> */}
                    </>
                    ))}
                </div>
                //{/* <!--***end of row center**--> */}
            )}

        </div>
    );
}