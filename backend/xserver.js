import express from 'express';
// const express = require('express')
import data from './xdata.js'

// const data =require('./data')
//create an app
const app = express();

app.get('/', (req, res) => {
    res.send("server is ready");
});
//product screen api
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === Number(req.params.id));
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
    // console.log(data.products);
});
// app.listen(5000,()=>{
//     console.log('serve at http://localhost:5000');
// });
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})