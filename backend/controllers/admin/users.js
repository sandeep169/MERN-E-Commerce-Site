import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateErrUtility } from '../../utils/generateErr.js';
import { tryCatchUtility } from '../../utils/tryCatch.js';
import userModel from '../../models/user.js';


export const getUsersController = tryCatchUtility(async (req, res, next) => {
    // try {
        const users = await userModel.find();
        // console.log(users);
        if(!users.length) throw new generateErrUtility('no user found',404);
        return res.status(200).json(users);
    // } catch(err) {
        // res.status(404).json({message: err.message});
    // }
});


export const addUserController = 
// [
//     body('username','username must be of length 5 chars').exists().isLength({ min: 5 }),
//     body('email','invalid email!').exists().isEmail().normalizeEmail(),
//     body('password','invalid password').exists().isLength({min: 8}).isAlphanumeric(),
//     body('phone','invalid phone no.').isInt().isLength({ max:10, min: 10 }),
//     body('gender','invalid gender').isLength({ max:1, min: 1 }),
//     body('age','invalid age.').isInt().isLength({ max:2, min: 2 }),
//     body('ownership','invalid phone no.').exists()
// ],
async (req, res, next) => {
    // res.send(req.body);

    // const errs = validationResult(req);
    // if(!errs.isEmpty())
    //     // cls - http-err & try-catch
    //     return res.send(errs.array());

    const newUser = {};
    for(let ele in req.body) {
        if(ele === 'email') {
            try {
                const existingUser = await userModel.findOne({ email: req.body.email });
                if(existingUser) throw new generateErrUtility('email already exists',409);
            } catch (error) {
                return next(error);
            }
        }
        if(ele === 'password') {
            try {
                newUser[ele] = await bcrypt.hash(req.body.password, 10);
                if(!newUser[ele]) throw new generateErrUtility('Signup failed!..try agin later',500);
            } catch (error) {
                return next(error);
            }
        }
        else newUser[ele] = req.body[ele];
    }


        
    
    // const newUser = {};
    // for(let ele in req.body) {
    //     if(ele == 'password') {
    //         newUser[ele] = await bcrypt.hash(req.body.password, 10);
    //         continue;
    //     }
    //     newUser[ele] = req.body[ele];
    // }
    // console.log('newUser',newUser);

    try {
        const response = await userModel.create(newUser);
        res.status(201).json(response);
    } catch(err) {
        // const err = new Error('Signup failed!..try agin later',500);
        res.status(409).json({message: err.message});
        // return next(err);
    }

    // const newUserModel = new userModel(newUser);
    // try {
    //     await newUser.save();
    //     res.status(201).json(newUser);
    // } catch(err) {
    //     res.status(409).json({message: err.message});
    // }





};


export const updateUserController = async (req, res) => {
    const id = req.params.uid;
    // const response = await userModel.findByIdAndUpdate(id).exec();
    // // console.log("response",response);
    // if(!response) throw new generateErrUtility('no user found',404);
    // return res.status(302).json(response);
    // res.send('Profile updated successfully!');
    try {
        const response = await userModel.findByIdAndUpdate(id).exec();
        console.log(response);
        res.status(302).json(response);
    } catch(err) {
        res.status(304).json({message: err.message});
    }
};


export const deleteUsersController = tryCatchUtility(async (req, res, next) => {
    const id = req.params.uid;
    // try {
        // const users = await userModel.deleteMany();
        const result = await userModel.findByIdAndRemove(id).exec();
        // console.log(result);
        if(!result) throw new generateErrUtility('unable to delete',501);
        res.send('user deleted successfully..');
        // res.send('Your profile has been deleted successfully..\nGood Bye!');
    // } catch(err) {
    //     res.status(501).json({message: err.message});
    // }
});

