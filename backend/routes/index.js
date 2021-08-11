import express from 'express';

import signupRoute from './auth/signup.js';
import loginRoute from './auth/login.js';
import adminPanelRoute from './adminpanel/index.js';
import profileRoute from './profile.js';
import commonRoute from './common/index.js';    // common between admin & user
import publicRoute from './public.js';  // accessible to public

import { validateTokenUtility } from '../utils/validation/token.js';
import { validateUserUtility } from '../utils/validation/user.js';

import { generateErrUtility } from '../utils/errHandling/generateErr.js';
import { printErrUtility } from '../utils/errHandling/printErr.js';


const router = express.Router();

router.use('/signup',signupRoute);
router.use('/login',loginRoute);

router.get(/^\/(home)*$/,validateTokenUtility,validateUserUtility);

// admin-panel
router.use('/adminpanel',validateTokenUtility,validateUserUtility,adminPanelRoute);

// profile - admin/user
router.use('/profile',validateTokenUtility,profileRoute);

// common - admin/user
router.use('/common',validateTokenUtility,commonRoute);

router.use('/',publicRoute);

// for invalid urls
router.all('*',(req) => {
    throw new generateErrUtility(`Requested url: [${req.method}] ${req.headers.host + req.originalUrl} doesn't exist!`,404); // directly passing err to global err handler & printer written below, without using 'next(err)'
});

// express err handler, global err format for printing user defined errs
router.use(printErrUtility);

export default router;

