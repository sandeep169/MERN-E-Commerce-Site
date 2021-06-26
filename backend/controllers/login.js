import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import userModel from '../models/user.js';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

export const verifyLoggerController = tryCatchUtility(async (req, res, next) => {
    const { email, password } = req.body;
    
    // let userData;
    // tryCatchUtility(async() => {
    //     userData = await userModel.findOne({ email }).lean();     // extract all the user data from db
    //     throw new generateErrUtility(error);
    // });
    
        // userData = await userModel.findOne({ email }).lean()     // extract all the user data from db
        // .then(() => {
        //     if(!userData) throw new generateErrUtility('invalid credentials',401);     // handle userData value(LHS)
        // })
        // .catch(error => new generateErrUtility(error));

    // try {
        const userData = await userModel.findOne({ email }).lean();     // extract all the user data from db
    // } catch (error) {
    //     return next(error);     // handle await stmt(RHS)
    // }
    if(!userData) throw new generateErrUtility('invalid credentials',401);     // handle userData value(LHS)

    // let isValidPass;
    // try {
        const isValidPass = await bcrypt.compare(password, userData.password);
    // } catch (error) {
        // return next(error);     // handle await stmt(RHS)
    // }
    if(!isValidPass) throw new generateErrUtility('invalid credentials',401);     // handle isValidPass value(LHS)

    // let token;
    // try {
        const token = jwt.sign(     // data will be sent to end user in token, so it must hv specific required info only
            { userid: userData._id, username: userData.username, group: userData.ownership },
            // { uid: userData._id },
            process.env.SERVER_SECRET,
            { expiresIn: "12h" }
        );
    // } catch (error) {
        // return next(error);     // handle internal errs(RHS)
    // }
    if(!token) throw new generateErrUtility('something went wrong...\nPlease try again later!',500);     // handle token value(LHS)

    req.userRole = userData.ownership;
    // res.status(200).json({ msg: 'login successfully', token: token });      // also decide here where to go - user or admin
    console.log(`{ token: ${token} }`);
    next();

    // res.send('yoo..testing!');
});
