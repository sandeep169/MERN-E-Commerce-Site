import { body, validationResult } from 'express-validator';

// import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateDataUtility = tryCatchUtility(async(req, res, next) => {
    // let regex = /^\/signup$/;     // user model
    // if(regex.test(req.originalUrl))
    // {
    //     await body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }).run(req);
    //     await body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail().run(req);
    //     await body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric().run(req);

    // }
    const apisRegexp = {
        login:   /^\/login$/,
        user:    /^\/(?:signup|(((?:[a-eh-z]+\/)+)(?:updateprofile|((?:add|update)user))(\/[a-z0-9]+){0,1}))$/,
        product: /^(\/(?:[a-z]+\/)+)((?:add|update)product)(\/[a-z0-9]+){0,1}$/,
        cart:    /^(\/(?:[a-z]+\/)+)(other|editproduct)(\/[a-z0-9]+){1}$/,
        review:  /^(\/(?:[a-z]+\/)+)(reviews|editreview)(\/[a-z0-9]+){1}$/,
        rating:  /^(\/(?:[a-z]+\/)+)(ratings|editrating)(\/[a-z0-9]+){1}$/
    };

    switch (true) {
        case apisRegexp.login.test(req.originalUrl):
            // localhost:5000/login
            await body('email','').isEmail().normalizeEmail().run(req);
            await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);

            break;
        case apisRegexp.user.test(req.originalUrl):
            // localhost:5000/signup
            // localhost:5000/adminpanel/users/adduser
            // localhost:5000/adminpanel/users/updateuser/:uid
            // localhost:5000/profile/updateprofile/:uid
            await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
            await body('email','').isEmail().normalizeEmail().run(req);
            // await body('email','Try another email').custom(value => {
                // return userModel.findOne({ email: value }).then(user => {
                    // console.log(user);
                    // if(user) return Promise.reject('email already exists');
                // });
            // }).exists({ checkFalsy: true }).trim().isEmail().normalizeEmail().run(req);
            await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);

            // await body('phone','Invalid phone no.').exists().isInt().isLength({ max:10, min: 10 }).run(req);
            // await body('phone').custom((value, { req }) => {
                // if(value && !/^[0-9]{10}$/.test(value)) {
                // if(!( value.isInt() && value.isLength({ max:10, min: 10 }))) {
                    // const regex = /[0-9]{10}/;
                    // if(!/[0-9]{10}/.test(value))
                        // return Promise.reject('Invalid phone no.');
                // }
            // }).run(req);
            // await check('gender','Invalid gender').isLength({ max:1, min: 1 }).run(req);
            // await body('age','Invalid age.').isInt().isLength({ max:2, min: 2 }).run(req);
            // await body('ownership','invalid phone no.').exists().run(req);

            break;
        case apisRegexp.product.test(req.originalUrl):
            // localhost:5000/adminpanel/products/addproduct
            // localhost:5000/adminpanel/products/updateproduct/:pid
       
            await body('product_name','').trim().isLength({ min: 3 }).isAlphanumeric().run(req);
            await body('price','').trim().isNumeric().run(req);
            // await body('product_sizes','').trim().isLength({ max:2 }).isArray().isString().run(req);
            // await body('product_sizes','').isArray().trim().isLength({ max:2 }).isString().run(req);
            await body('product_sizes.*','').trim().isLength({ max:2 }).isAlpha().run(req);
            await body('product_colors.*','').trim().isAlpha().run(req);
            await body('product_gender','').trim().isLength({ max:1 }).isAlpha().run(req);
            await body('brand','').trim().isAlpha().run(req);
            await body('category','').trim().isAlpha().run(req);
            await body('stock','').trim().isNumeric().run(req);

            break;
        case apisRegexp.cart.test(req.originalUrl):
            // localhost:5000/common/other/:pid
            // localhost:5000/common/cart/editproduct/:cpid 
       
            await body('user_id','').trim().isAlphanumeric().run(req);
            await body('product_id','').trim().isAlphanumeric().run(req);
            await body('quantity','').trim().isNumeric().run(req);
            await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
            await body('color','').trim().isAlpha().run(req);

            break;
        case apisRegexp.review.test(req.originalUrl):
            // localhost:5000/common/reviews/:pid
            // localhost:5000/common/reviews/editreview/:rid

            await body('user_id','').trim().isAlphanumeric().run(req);
            await body('product_id','').trim().isAlphanumeric().run(req);
            await body('comment','').trim().isLength({ max: 250 }).isAlpha('en-US', { ignore: '. ' }).run(req);

            break;
        case apisRegexp.rating.test(req.originalUrl):
            // localhost:5000/common/ratings/:pid
            // localhost:5000/common/ratings/editrating/:rid

            await body('rating','').trim().isInt({min:1,max:5}).run(req);

            break;

        /*
        case /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('user_id','').trim().isAlphanumeric().run(req);
            await body('product_id','').trim().isAlphanumeric().run(req);
            await body('order_no','').trim().isNumeric().run(req);
            await body('quantity','').trim().isNumeric().run(req);
            await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
            await body('color','').trim().isAlpha().run(req);
            await body('status','').trim().isAlpha().run(req);

            break;

        case /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('user_id','').trim().isAlphanumeric().run(req);
            await body('product_id','').trim().isAlphanumeric().run(req);
            await body('order_no','').trim().isNumeric().run(req);
            await body('return_no','').trim().isNumeric().run(req);
            await body('quantity','').trim().isNumeric().run(req);
            await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
            await body('color','').trim().isAlpha().run(req);
            await body('status','').trim().isAlpha().run(req);

            break;
        */

        // default: throw new generateErrUtility('Bad Request',400);
    }

    const errors = validationResult(req);
    // console.log(errors,typeof errors);
    
    if(!errors.isEmpty()) {
        // errors = errors.mapped();
        // return res.status(422).json({errors: errors.mapped()});
        return res.status(422).json({errors: errors.array()});
        // throw new generateErrUtility(errors.array(),422);
    }

    // console.log(errors);
    // console.log(errors.mapped());
    // console.log(errors.array());

    // next();
});
