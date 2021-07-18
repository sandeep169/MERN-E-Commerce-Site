// for actions to be performed by authenticated users only (basically after logging in)

import jwt from "jsonwebtoken";

import { key } from "../../controllers/login.js";

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateTokenUtility = (req, res, next) => {   // check token validity
    const { authorization } = req.headers;
    if(authorization === undefined) {
        const { originalUrl:url } = req;
        if(url === '/' || url === '/home') return next();
        if(url === '/favicon.ico') return;
        throw new generateErrUtility('Unauthorized!',401);
    }

    const token = authorization.split(' ')[1];     // 'split' breaks the string into multiple arrays from the places where it finds the passed string

    jwt.verify(token, key, (err, user) => {
        if(err) throw new generateErrUtility('Forbidden!',403);
        req.user = user;     // 'req.' adds data in it and use to send that data to next middleware
    });
    next();
};

