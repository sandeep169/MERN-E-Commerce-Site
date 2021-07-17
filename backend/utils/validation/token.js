// for actions to be performed by authenticated users only (basically after logging in)

import jwt from "jsonwebtoken";

import { key } from "../../controllers/login.js";

// import { tryCatchUtility } from '../errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateTokenUtility = (req, res, next) => {   // check token validity
    // console.log('role',req.userRole);
    const { authorization } = req.headers;
    // console.log("bh",bearerHeader);

    if(authorization === undefined) {
        //  return res.sendStatus(401);
        // console.log('req',req);
        // console.log('\nreq.originalUrl',req.originalUrl,'\nreq.baseUrl',req.baseUrl,'\nreq.url',req.url,'\n');
        // return req.originalUrl === '/home' ? next() : res.sendStatus(401);

        // const err = () => { throw new generateErrUtility('Unauthorized',401); };
        // return req.originalUrl === '/home' ? next() : err();

        // if(req.originalUrl !== '/' && req.originalUrl !== '/home') throw new generateErrUtility('Unauthorized',401);
        // return next();

        const { originalUrl:url } = req;
        if(url === '/' || url === '/home') return next();
        if(url === '/favicon.ico') return;
        throw new generateErrUtility('Unauthorized!',401);
    }


    const token = authorization.split(' ')[1];     // 'split' breaks the string into multiple arrays from the places where it finds the passed string
    // console.log("bt",bearerToken);

    // jwt.verify(token, process.env.SERVER_SECRET, (err, user) => {
    // console.log('\ntoken access-key',key,'\n');
    jwt.verify(token, key, (err, user) => {
        // console.log('key',process.env.SERVER_SECRET, '\nuser', user);
        if(err) {
            // console.log(err);
            // return res.sendStatus(403);  // produce complication
            throw new generateErrUtility('Forbidden!',403);
        }
        // console.log("->",user);
        req.user = user;     // 'req.' adds data in it and use to send that data to next middleware
    });
    next();
};

