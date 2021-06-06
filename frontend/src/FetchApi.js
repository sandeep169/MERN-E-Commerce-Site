import React, { useEffect, useState } from 'react';

export function FetchApi (){

const [data, setData]=useState([]);

    const apiGet = () => {
        console.log("inside get api");
    // fetch("https://jsonplaceholder.typicode.com/posts/1")
    fetch("http://localhost:5000/api/products")
    .then((response) => response.json())
    .then((json)  =>
    {
        console.log(json)
        setData(json);
    })
    };
    useEffect(()=>
    {
        //calling our method apiget() here so that whenever page reloaded data will fetch
        apiGet();

    },[])
    return(
        <div>
           <h1>Arihant Backend data api for products</h1>
           <br></br>
            <button onClick={apiGet}>Click to ProductApi</button>
            <br/>
            <br></br>
            <pre>{JSON.stringify(data,null,3)}</pre>


        </div>
    );
};