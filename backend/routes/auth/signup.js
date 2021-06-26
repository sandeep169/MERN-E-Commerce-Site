import express from 'express';
// import {check, body, validationResult } from 'express-validator';

import { addUserApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

export default router.post('/', validateDataUtility,addUserApi);

// [
//     body('username','Try another username').exists({ checkFalsy: true }).isLength({ min: 4 }).trim(),
//     body('email','Try another email').exists({ checkFalsy: true }).isEmail().normalizeEmail(),
//     body('password','Invalid password').exists({ checkFalsy: true }).isLength({ min: 8 }).isAlphanumeric(),
//     body('phone','Invalid phone no.').isEmpty(),
//     check('gender','Invalid gender').isLength({ max:1, min: 1 }),
//     body('age','Invalid age.').isInt().isLength({ max:2, min: 2 }),
//     // body('ownership','invalid phone no.').exists(),
// ],
//     function(req,res,next){
//         const errors = validationResult(req);
//         console.log(errors,typeof errors);

//         if(!errors.isEmpty())
//             return res.status(422).json({errors: errors.array()});
            
//         // console.log(errors.mapped());
// });
// addUserApi);

