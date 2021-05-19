import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import axios from 'axios';
// import data from '../data';
// console.log(axios);
export default function HomeScreen() {
    // console.log(axios);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products'); //obj will from axios ,this will return  data 
                setLoading(false);
                setProducts(data);
            }catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();

    }, []);



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