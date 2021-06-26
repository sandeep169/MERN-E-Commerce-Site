import {check, body, validationResult } from 'express-validator';
import express from 'express';

// import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

// let arr;
const rules = (req) => {
    // this.req = req;
    let arr;
    // let regex = /^\/(^signup|(([a-z]+\/)+(add|update)user))$/;     // user model
    let regex = /^\/signup$/;     // user model
    if(regex.test(req.originalUrl))
    {
        arr = [
                body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }),
                body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
                body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric()
    ];
        
    }

    switch (req.originalUrl) {
        case /^\/signup$/.test(req.originalUrl):
            console.log('switch case');
            break;

        default:
            break;
    }
    // console.log('arr',arr);
    // arr = arr.replace('-','');
    return arr; //.split('),');
};

export const rules1 = async(req) => {
    await body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }).run(req);
    await body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail().run(req);
    const errors = validationResult(req);
        console.log('chkerrs->');
        console.log(errors);
        console.log(errors.mapped());
};
    
// export const validateDataUtility = (req, res, next) => {
export const validateDataUtility = {
    dataSchema: function(req, res, next) {
        let x = rules1(req);
        // console.log('x',x,typeof x);
        // console.log(x[0].builderOrContext,x[0].builder);
        // let a =[];
        // for (let i in x) {

        //     for(let key in x[i]) {
        //         // a.push(key);
        //         if(key === 'builderOrContext' || key === 'builder')
        //         // console.log(x[i][key]);
        //         a.push(x[i][key]);
        //     }
        // }
        return x;
        // [
            // body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }),
            // body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
            // body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric()
// ],
    },

    chkErrs: function(req, res, next) {

        const errors = validationResult(req);
        // if(!errors.isEmpty())
            // return res.status(400).json({errors: errors.array()});
        console.log('chkerrs->');
        console.log(errors);
        console.log(errors.mapped());
        // next();
    }
};

/*function validateDataUtility1(req, res, next) {
    this.dataSchema = [
        body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }),
        body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
        body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric(),
    ];
    this.chkErrs = (req) => {
        const errors = validationResult(req);
        // if(!errors.isEmpty())
            // return res.status(400).json({errors: errors.array()});
        console.log(errors);
        console.log(errors.mapped());  
    };
}*/
// export const obj = new validateDataUtility1(req,res,next);
// export function fn1(req,res,next){
    // this.obj = new validateDataUtility1(req,res,next);
// }

    // }
    // const x = dataSchema;
    // const y = chkErrs(req,res,next);
    // let regex = /^\/(^signup|(([a-z]+\/)+(add|update)user))$/;     // user model
    // if(regex.test(req.originalUrl))
    // {

            // check('phone','Invalid phone no.').isInt().isLength({ max:10, min: 10 }),
            // check('gender').isLength({ max:1, min: 1 }),
            // check('age','invalid age.').isInt().isLength({ max:2, min: 2 }),
            // check('ownership').exists()

            
            
        // ];
        // chkErrs(req,res,next);
        // const errors = validationResult(req);
    // if(!errors.isEmpty())
        // return res.status(400).json({errors: errors.array()});
    // console.log(errors);
    // console.log(errors.mapped());
        // req = express.Request;
        // res = express.Response;
        // (req, res) => {
         
    // }





    /*
    regex = /^(\/(?:[a-z]+\/)+)((?:add|update)product)(\/[a-z0-9]*){0,1}$/;    // product model
    if(regex.test(req.originalUrl))
    {}
    
    regex = /^(\/(?:[a-z]+\/)+)((?:add|update)cart)(\/[a-z0-9]*){0,1}$/;    // cart model
    if(regex.test(req.originalUrl))
    {}
    
    regex = /^(\/(?:[a-z]+\/)+)((?:add|update)review)(\/[a-z0-9]*){0,1}$/;    // review model
    if(regex.test(req.originalUrl))
    {}
    
    regex = /^(\/(?:[a-z]+\/)+)((?:add|update)rating)(\/[a-z0-9]*){0,1}$/;    // rating model
    if(regex.test(req.originalUrl))
    {}
    */

    // regex = /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/;    // order model
    // if(regex.test(req.originalUrl))
    // {}
    
    // regex = /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/;    // return model
    // if(regex.test(req.originalUrl))
    // {}
    

    // signup
    // login

    // add/update user
    // add/update product

    // update to cart

    // add/update review
    // add/update rating

    // add product to cart
    

    
    // after payment module -:
    // add/update order
    // add/update return
    
    // throw new generateErrUtility('Invalid Url',400);
// };

