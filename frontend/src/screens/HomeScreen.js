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
    
    //useSelector() :const result: any = useSelector(selector: Function, equalityFn?: Function)
    //Allows you to extract data from the Redux store state,using a selector function.
    //useSelector() will also subscribe to the Redux store,
    // and run your selector whenever an action is dispatched.

    const productList = useSelector((state)=>state.productList);
    //When an action is dispatched, useSelector() will do a reference 
    //comparison of the previous selector result value and the current result
    // value. If they are different, the component will be forced to re-render.
    //If they are the same, the component will not re-render.

    const {loading,error,products} = productList;

    //three value from PL .. array destructuring.. unpacking value from array
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
            ) :
            (
                <div className="row center">
                    {products.map((product) =>
                    (<>
                        <Product key={product._id} product={product}></Product>
                    
                    </>
                    )
                    )}
                </div>
                //{/* <!--***end of row center**--> */}
            )}

        </div>
    );
}