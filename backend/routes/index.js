import express from 'express';

import signupRoute from './auth/signup.js';
import loginRoute from './auth/login.js';
import adminPanelRoute from './adminpanel/index.js';
import profileRoute from './profile.js';
import commonRoute from './common/index.js';    // common between admin & user
import publicRoute from './public.js';  // accessible to public
// import { getProductApi, getProductRatingApi, getProductReviewsApi } from '../controllers/api.js';

import { validateTokenUtility } from '../utils/validation/token.js';
import { validateUserUtility } from '../utils/validation/user.js';

import { generateErrUtility } from '../utils/errHandling/generateErr.js';
import { printErrUtility } from '../utils/errHandling/printErr.js';


const router = express.Router();

router.use('/signup',signupRoute);
router.use('/login',loginRoute);

// router.get('/home',validateTokenUtility,validateUserUtility);
// router.get(['/', '/home'],validateTokenUtility,validateUserUtility);
// router.get(['/$', '/home'],validateTokenUtility,validateUserUtility);
// router.get('^(\/(home)*)$',validateTokenUtility,validateUserUtility);
// router.get('(\/(home)*)',validateTokenUtility,validateUserUtility);
// router.get('/((home){0,1})',validateTokenUtility,validateUserUtility);
router.get(/^\/(home)*$/,validateTokenUtility,validateUserUtility);

// admin-panel
router.use('/adminpanel',validateTokenUtility,validateUserUtility,adminPanelRoute);

// profile - admin/user
router.use('/profile',validateTokenUtility,profileRoute);

// common - admin/user
router.use('/common',validateTokenUtility,commonRoute);

/*// view any particular product as guest
// router.get('/:pcode',getProductApi);
// router.get(/^\/[a-z0-9_-]{6}$/,getProductApi);
router.get('/:pcode([a-z0-9_-]{6})',getProductApi);

// get product consolidated rating
router.get('/productrating',getProductRatingApi);

// get product reviews
router.get('/productreviews',getProductReviewsApi);

// get access to dir 'images'
router.use('/images',express.static('images'));*/

router.use('/',publicRoute);

// for invalid urls
router.all('*',(req) => { // , res, next) => {
// router.all(/[a-zA-Z0-9]+/,(req) => { // , res, next) => {
// router.use(function(req) {
    // console.log('->',req.method);
    throw new generateErrUtility(`Requested url: [${req.method}] ${req.headers.host + req.originalUrl} doesn't exist!`,404); // directly passing err to next middleware i.e. global err printer written below, without using 'next()'
    // if we use 'async' then we hv to use 'next()' to pass err to next middleware
    // next(err);  // it'll call global err handler, if used 'next()' then it'll call next middleware
});

// express err handler - every user throwned err in the site is sent to this to be sent to client in response()
// global err format for printing user defined errs
router.use(printErrUtility);

export default router;

// export {
//     router as routes,
//     app as app
// };
// export { default, app, router };

