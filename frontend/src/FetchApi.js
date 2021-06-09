// import axios from 'axios';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Product from './components/Product';


export function FetchApi() {
    const [data, setData] = useState([]);
  //as data is coming as an object in array so data is defined as curly braces
    const apiGet = async () => {

        // console.log("inside get api");
        //using fetch api of JavaScript 
        // fetch("https://jsonplaceholder.typicode.com/posts/1")
        //    fetch("/api/products")
        //     .then((response) => response.json())
        //     .then((json)  =>
        //     {
        //         console.log(json)
        //         setData(json);
        //     })
        await Axios.get("/api/products/")
        .then(({
            data
        },response)=>  {console.log(data)
            console.log(response);
        setData(data);
    } )
        //    not running //reason is to be find yet
        // .then(function (response) {
            //     console.log("running ");
            //     console.log(response.data)
            //     console.log(response.status);
            //     setData(data);
            // })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
            // //this function will called 
            // .then(function(){
                // setData(data);
            // });
        // console.log(data);
        // setData(data);
        // // console.log(data);


    };
   


    useEffect(() => {
        // calling our method apiget() here so that whenever page reloaded data will fetch
        apiGet();

    }, [])
    return (
        <>
        
            <div>
                <h1>Arihant Backend data api for products</h1>
                <br></br>
                <button onClick={apiGet}>Click to ProductApi</button>
                <br />
                <br />
                {/* <pre>{JSON.stringify(data,null,3)}</pre> */}
                {/* <pre>{JSON.stringify(data,null,3)}</pre> */}

                {data?.map((item) =>
                    <li>
                        {item.brand}
                    </li>
                )}

                {/* <Product key={data._id} product={data}></Product> */}


            </div>
        </>
    );
}