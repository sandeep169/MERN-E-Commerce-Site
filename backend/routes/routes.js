import express from 'express';
import userRoute from './user.js';
import productsRoute from './products.js';

const app = express();

app.use('/user',userRoute);
app.use('/products',productsRoute);

export default app;
