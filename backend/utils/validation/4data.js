import { body, validationResult } from 'express-validator';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateDataUtility = tryCatchUtility(async(req, res, next) => {
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
        case apisRegexp.user.test(req.originalUrl):
            await body('email','').isEmail().normalizeEmail().run(req);
            await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);
    
        case apisRegexp.user.test(req.originalUrl):
            await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
    
        case apisRegexp.product.test(req.originalUrl):
            await body('product_name','').trim().isLength({ min: 3 }).isAlphanumeric().run(req);
            await body('price','').trim().isNumeric().run(req);
            await body('product_sizes.*','').trim().isLength({ max:2 }).isAlpha().run(req);
            await body('product_colors.*','').trim().isAlpha().run(req);
            await body('product_gender','').trim().isLength({ max:1 }).isAlpha().run(req);
            await body('brand','').trim().isAlpha().run(req);
            await body('category','').trim().isAlpha().run(req);
            await body('stock','').trim().isNumeric().run(req);
        
        case apisRegexp.cart.test(req.originalUrl):
        case apisRegexp.review.test(req.originalUrl):
        case /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
        case /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('user_id','').trim().isAlphanumeric().run(req);
            await body('product_id','').trim().isAlphanumeric().run(req);

        case apisRegexp.cart.test(req.originalUrl):
        case /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
        case /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('quantity','').trim().isNumeric().run(req);
            await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
            await body('color','').trim().isAlpha().run(req);

        case apisRegexp.review.test(req.originalUrl):
            await body('comment','').trim().isLength({ max: 250 }).isAlpha('en-US', { ignore: '. ' }).run(req);

        case apisRegexp.rating.test(req.originalUrl):
            await body('rating','').trim().isInt({min:1,max:5}).run(req);

        case /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
        case /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('order_no','').trim().isNumeric().run(req);
            await body('status','').trim().isAlpha().run(req);
        case /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(req.originalUrl):
            await body('return_no','').trim().isNumeric().run(req);

        // default: throw new generateErrUtility('Bad Request',400);
    }

    const errors = validationResult(req);
    console.log(errors,typeof errors);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
        // throw new generateErrUtility(errors.array(),422);
    }
    // next();
});
