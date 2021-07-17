import { body, validationResult } from 'express-validator';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
// import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const validateDataUtility = tryCatchUtility(async(req, res, next) => {
    const apisRegexp = {
// signup, login, adduser, updateuser, addproduct, updateproduct, updateprofile, addproducttocart, editcartproduct, addreview, editreview,              placeorder, retrnproduct
        login:          /^\/login$/,
        addUser:        'adduser|signup',
        updateuser:     'updateuser|updateprofile',
        addproduct:     'addproduct',
        updateproduct:  'updateproduct',
        del:            'deleteusers|deleteproducts',
        addtocart:      'addproducttocart',
        editcart:       'editcartproduct',
        review:         'addreview|editreview',

        user:    /^\/(?:signup|(((?:[a-eh-z]+\/)+)(?:updateprofile|((?:add|update)user))(\/[a-z0-9]+){0,1}))$/,
        product: /^(\/(?:[a-z]+\/)+)((?:add|update)product)(\/[a-z0-9]+){0,1}$/,
        cart:    /^(\/(?:[a-z]+\/)+)(other|editproduct)(\/[a-z0-9]+){1}$/,
        review1:  /^(\/(?:[a-z]+\/)+)(reviews|editreview)(\/[a-z0-9]+){1}$/,
        rating:  /^(\/(?:[a-z]+\/)+)(ratings|editrating)(\/[a-z0-9]+){1}$/,
        order:   / /,
        returnproduct:  / /
    };

    const { originalUrl:url, body:data } = req;
    const { login, addUser, user, product, cart, review, rating, order, returnproduct } = apisRegexp;

    if(login.test(url) || adduser.test(url)) {
        // signup, login, adduser
        await body('email','').isEmail().normalizeEmail().run(req);
        await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);
    }

    if(adduser.test(url))
        // signup, adduser
        await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
        // chk other fields too with if condn
        if(data.phone) await body('phone','').trim().isMobilePhone().run(req);
        if(data.gender) await body('gender','').trim().isLength({ max: 1 }).isAlpha().run(req);
        if(data.age) await body('age','').trim().isLength({ min: 2, max: 2 }).run(req);
        // if(data.age) await body('age','').trim().isInt({ min: 10, max: 99 }).run(req);
        if(data.ownership) await body('ownership','').trim().matches(/^(admin|user)$/).run(req);

    if(updateuser.test(url)) {
    // if(updateuser, updateprofile)
            // if(name,email,pass)
        if(data.username) await body('username','').trim().isLength({ min: 4 }).isAlphanumeric().run(req);
        if(data.email) await body('email','').isEmail().normalizeEmail().run(req);
        if(data.password) await body('password','').trim().isLength({ min: 8 }).isAlphanumeric().run(req);
    }

    // if(deleteusers, deleteproducts)
            // if(userid, productid)

    if(product.test(url)) {
        // addproduct
        await body('product_name','').trim().isLength({ min: 3 }).isAlphanumeric().run(req);
        // await body('code','').trim().isAlphanumeric('en-US', { ignore: '-_' }).isLength(6).run(req);
        await body('code','').trim().matches(/^[a-z0-9_-]{6}$/).run(req);
        await body('price','').trim().isNumeric().run(req);
        await body('product_sizes.*','').trim().isLength({ max: 2 }).isAlpha().run(req);
        await body('product_colors.*','').trim().isAlpha().run(req);
        await body('product_gender','').trim().isLength({ max: 1 }).isAlpha().run(req);
        if(data.brand) await body('brand','').trim().isAlpha().run(req);
        if(data.category) await body('category','').trim().isAlpha().run(req);
        if(data.subCategory) await body('subCategory','').trim().isAlpha().run(req);
        if(data.subSubCategory) await body('subSubCategory','').trim().isAlpha().run(req);
        if(data.stock) await body('stock','').trim().isNumeric().run(req);
        if(data.rating) await body('rating','').trim().isInt({ min: 1, max: 5 }).run(req);
    }

    // if(updateproduct)
           // chk all fields with if condn

    /*if(cart.test(url) ||
        review.test(url)) // ||
        // /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(url) ||
        // /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(url))
        {
            await body('user_id','').trim().isMongoId().run(req);
            await body('product_id','').trim().isMongoId().run(req);
        }*/

    if(cart.test(url)) // ||
        // addproducttocart
        // /^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(url) ||
        // /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(url))
        {
            await body('quantity','').trim().isNumeric().run(req);
            await body('size','').trim().isLength({ max: 2 }).isAlpha().run(req);
            await body('color','').trim().isAlpha().run(req);
        }

    // if(editcartproduct)
           // chk all fields with if condn

    if(review.test(url))
        // addreview, editreview
        await body('comment','').trim().isAlpha('en-US', { ignore: '. ' }).isLength({ max: 250 }).run(req);
        await body('rating','').trim().isInt({ min: 1, max: 5 }).run(req);

    // if(rating.test(url))
        // await body('rating','').trim().isInt({ min: 1, max: 5 }).run(req);

    // if(/^(\/(?:[a-z]+\/)+)((?:add|update)order)(\/[a-z0-9]*){0,1}$/.test(url) ||
    //     /^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(url))
    //     {
    //         await body('order_no','').trim().isNumeric().run(req);
    //         await body('status','').trim().isAlpha().run(req);
    //     }

    // if(/^(\/(?:[a-z]+\/)+)((?:add|update)return)(\/[a-z0-9]*){0,1}$/.test(url))
    //     await body('return_no','').trim().isNumeric().run(req);

    // else throw new generateErrUtility('Bad Request',400);

    const errors = validationResult(req);
    // console.log(errors,typeof errors);
    if(!errors.isEmpty()) {
        // return res.status(422).json({errors: errors.mapped()});
        return res.status(422).json({ errors: errors.array() });
        // throw new generateErrUtility(errors.array(),422);
    }
    next();
});

