import { body, validationResult } from 'express-validator';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateDataUtility = tryCatchUtility(async(req, res, next) => {
    const apisRegexp = {
        login:          /^\/login$/,
        addUser:        /^\/(?:signup|(((?:[a-fh-z]+\/)+)adduser))$/,                       // '/(signup|/adduser)'
        updateUser:     /^\/((?:[a-z]+\/)+)update(profile|(?:user(\/[a-z0-9]+){1}))$/,      // '/(updateprofile|updateuser/)'
        addProduct:     /^\/((?:[a-z]+\/)+)addproduct$/,                                    // '/addproduct'
        updateProduct:  /^\/((?:[a-z]+\/)+)updateproduct(\/[a-z0-9]+){1}$/,                 // '/updateproduct/'
        del:            /^\/((?:[a-z]+\/)+)delete(users|products)$/,                        // '/(deleteusers|deleteproducts)'
        addToCart:      /^\/((?:[a-z]+\/)+)addproducttocart(\/[a-z0-9]+){1}$/,              // '/addproducttocart/'
        editCart:       /^\/((?:[a-z]+\/)+)editcartproduct(\/[a-z0-9]+){1}$/,               // '/editcartproduct/'
        addReview:      /^\/((?:[a-z]+\/)+)addreview(\/[a-z0-9]+){1}$/,                     // '/addreview/'
        editReview:     /^\/((?:[a-z]+\/)+)editreview(\/[a-z0-9]+){1}$/,                    // '/editreview/'
        return_rsn:     /^\/((?:[a-z]+\/)+)returnproduct(\/[a-z0-9]+){1}$/                  // '/returnproduct/'
    };

    const { originalUrl:url, body:data } = req;
    const { login, addUser, updateUser, addProduct, updateProduct, del, addToCart, editCart, addReview, editReview, return_rsn } = apisRegexp;

    if(login.test(url) || addUser.test(url)) {
        await body('email','').isEmail().normalizeEmail().run(req);
        await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);
    }
    if(addUser.test(url))
        await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
    if(updateUser.test(url)) {
        if(data.username) await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
        if(data.email) await body('email','').isEmail().normalizeEmail().run(req);
        if(data.password) await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);
    }
    if(addUser.test(url) || updateUser.test(url)) {
        if(data.phone) await body('phone','').trim().isMobilePhone().run(req);
        if(data.gender) await body('gender','').trim().isLength({ max: 1 }).isAlpha().run(req);
        if(data.age) await body('age','').trim().isInt({ min: 10, max: 99 }).run(req);
        if(data.ownership) await body('ownership','').trim().matches(/^(admin|user)$/).run(req);
    }
    if(addProduct.test(url)) {
        await body('product_name','').trim().isLength({ min: 3 }).isAlphanumeric().run(req);
        await body('code','').trim().matches(/^[a-z0-9_-]{6,15}$/).run(req);
        await body('price','').trim().isNumeric().run(req);
        await body('product_sizes.*','').trim().isLength({ max: 2 }).isAlpha().run(req);
        await body('product_colors.*','').trim().isAlpha().run(req);
        await body('product_gender','').trim().isLength({ max: 1 }).isAlpha().run(req);
    }
    if(updateProduct.test(url)) {
        if(data.product_name) await body('product_name','').trim().isLength({ min: 3 }).isAlphanumeric().run(req);
        if(data.code) await body('code','').trim().matches(/^[a-z0-9_-]{6}$/).run(req);
        if(data.price) await body('price','').trim().isNumeric().run(req);
        if(data.product_sizes) await body('product_sizes.*','').trim().isLength({ max: 2 }).isAlpha().run(req);
        if(data.product_colors) await body('product_colors.*','').trim().isAlpha().run(req);
        if(data.product_gender) await body('product_gender','').trim().isLength({ max: 1 }).isAlpha().run(req);
    }
    if(addProduct.test(url) || updateProduct.test(url)) {
        if(data.brand) await body('brand','').trim().isAlpha().run(req);
        if(data.category) await body('category','').trim().isAlpha().run(req);
        if(data.subCategory) await body('subCategory','').trim().isAlpha().run(req);
        if(data.subSubCategory) await body('subSubCategory','').trim().isAlpha().run(req);
        if(data.stock) await body('stock','').trim().isNumeric().run(req);
        if(data.rating) await body('rating','').trim().isInt({ min: 1, max: 5 }).run(req);
    }
    if(del.test(url))
        await body('ids.*','').trim().isMongoId().run(req);
    if(addToCart.test(url)) {
        await body('quantity','').trim().isNumeric().run(req);
        await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
        await body('color','').trim().isAlpha().run(req);
    }
    if(editCart.test(url)) {
        if(!data.quantity && !data.size && !data.color) throw new generateErrUtility('Bad Request',400);
        if(data.quantity) await body('quantity','').trim().isNumeric().run(req);
        if(data.size) await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
        if(data.color) await body('color','').trim().isAlpha().run(req);
    }
    if(addReview.test(url) || editReview.test(url)) {
        if(!data.title && !data.comment && !data.rating) throw new generateErrUtility('Bad Request',400);
        if(data.title) await body('title','').trim().isString().isLength({ max: 50 }).run(req);
        if(data.comment) await body('comment','').trim().isString().isLength({ max: 250 }).run(req);
        if(data.rating) await body('rating','').trim().isInt({ min: 1, max: 5 }).run(req);
    }
    if(editReview.test(url))
        await body('product_id','').trim().isMongoId().run(req);
    if(return_rsn.test(url))
        await body('reason','').trim().isString().isLength({ max: 250 }).run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // return res.status(422).json({errors: errors.mapped()});
        return res.status(422).json({ errors: errors.array() });
    }
    next();
});

