import express from 'express';
import signupRoute from './auth/signup.js';
import loginRoute from './auth/login.js';
// import { validity } from './auth/login.js';
import adminRoute from './admin/admin.js';
import userRoute from './user/user.js';
// import { getProductApi } from '../controllers/api.js';

const app = express();

app.use('/signup',signupRoute);
app.use('/login',loginRoute);
// app.post('/login',validity);

// if(req.body.validity === 'admin')
if(loginRoute.validity && loginRoute.validity === 'admin')
    app.use('/:admin',adminRoute);

// if(req.body.validity === 'user')
if(loginRoute.validity && loginRoute.validity === 'user')
    app.use('/:user',userRoute);

// router.get('/products/:pcode',getProductApi);

export default app;

// export {
//     router as routes,
//     app as app
// };
// export { default, app, router };
