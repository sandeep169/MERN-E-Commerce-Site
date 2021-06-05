import express from 'express';
import signupRoute from './auth/signup.js';
import loginRoute from './auth/login.js';
import adminRoute from './admin/admin.js';
import userRoute from './user/user.js';
// import { getProductApi } from '../controllers/api.js';
import { generateErrUtility } from '../utils/generateErr.js';
import { printErrUtility } from '../utils/printErr.js';

const app = express();

app.use('/signup',signupRoute);
app.use('/login',loginRoute);
app.use('/:admin',adminRoute);
app.use('/:user',userRoute);

// app.set('view engine', 'ejs');
app.use('/',(req,res) => {
    // res.render('index.js');
    res.send("<h1>Server is up and running...</h1>");
});

// app.get('/products/:pcode',getProductApi);

// for invalid urls
app.all('*',(req, res, next) => {
    throw new generateErrUtility(`requested url: ${req.path} doesn't exist`,404); // directly passing err to next middleware i.e. global err printer written below, without using 'next()'
    // if we use 'async' then we hv to use 'next()' to pass err to next middleware
    // next(err);  // it'll call global err handler, if used 'next()' then it'll call next middleware
});

// global err format for printing user defined errs
app.use(printErrUtility);

export default app;

// export {
//     router as routes,
//     app as app
// };
// export { default, app, router };
