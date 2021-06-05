import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import userModel from '../../models/user.js';


export const getUsersController = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(302).json(user);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
};


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
async (req, res) => {
    // res.send(req.body);

    // always store hashed pass in db even if u r the only person in ur company, so that if anytime ur db is leaked then the pass stored in it cant be useable to any1 unsless unhashed
    // hash methods - bcrypt, md5, sha1, sha256, sha512....
    // for hash pass - collision shud be immprobable
    //               - hash fn shud be slow -  make it harder for attacker to unhash the hashed pass

    // const { username, email, password: plainTextPass } = req.body;
    // const password = await bcrypt.hash(plainTextPass, 10);      // 10 extra chars mixed with pass to create hashed pass, the generated hash pass will always be of fixed length irrespective of length of original pass
    // console.log('password',password);

    // const errs = validationResult(req);
    // if(!errs.isEmpty())
    //     // cls - http-err & try-catch
    //     return res.send(errs.array());

    const newUser = {};
    for(let ele in req.body) {
        if(ele == 'email') {
            try {
                const x = await userModel.findOne({ email: req.body.email });
            } catch (error) {
                
            }
        }
        if(ele == 'password') {
            newUser[ele] = await bcrypt.hash(req.body.password, 10);
            continue;
        }
        newUser[ele] = req.body[ele];
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
        res.status(409).json({message: err.message});
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
    const id = req.params.id;
    try {
        await userModel.findByIdAndUpdate(id).exec();
        res.send('Profile updated successfully!');
    } catch(err) {
        res.status(304).json({message: err.message});
    }
};


export const deleteUsersController = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.findByIdAndRemove(id).exec();
        res.send('Your profile has been deleted successfully..\nGood Bye!');
    } catch(err) {
        res.status(501).json({message: err.message});
    }
};

