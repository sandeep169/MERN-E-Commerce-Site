import express from 'express';
import signupRoute from './auth/signup.js';
import loginRoute, { validity } from './auth/login.js';
// import { validity } from './auth/login.js';
import adminRoute from './admin/admin.js';
import userRoute from './user/user.js';
// import { getProductApi } from '../controllers/api.js';
import { generateErrUtility } from '../utils/generateErr.js';
import { printErrUtility } from '../utils/printErr.js';

const app = express();

app.use('/signup',signupRoute);
app.post('/login',validity);
// app.post('/login',validity);

// if(req.body.validity === 'admin')
// if(loginRoute.validity && loginRoute.validity === 'admin')
    app.use('/:admin',adminRoute);

// if(req.body.validity === 'user')
// if(loginRoute.validity && loginRoute.validity === 'user')
    app.use('/:user',userRoute);

// router.get('/products/:pcode',getProductApi);


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
