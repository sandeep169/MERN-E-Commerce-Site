import {check, body, validationResult } from 'express-validator';

class A {
    constructor(req,res,next) {
        let regex = /^\/signup$/;     // user model
        if(regex.test(req.originalUrl))
        {
            this.arr = [
                    body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }),
                    body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
                    body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric(),
                ];
            
        }
        next();
    }

    chkErrs() {
        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.mapped());
    }

}
export const obj = new A(req,res,next);
