// import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


export const getUsersController = tryCatchUtility(async (req, res) => {
    // try {
        const response = await userModel.find().lean();
        // console.log(users);
        if(!response.length) throw new generateErrUtility('No user found!',404);
        res.status(200).json({ users: response });
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
    tryCatchUtility(async (req, res) => {
    // res.send(req.body);

    // const errs = validationResult(req);
    // if(!errs.isEmpty())
    //     // cls - http-err & try-catch
    //     return res.send(errs.array());

    // const newUser = {};
    // for(let ele in req.body) {
    //     if(ele === 'email') {
    //         try {
    //             const existingEmail = await userModel.findOne({ email: req.body.email });
    //             if(existingEmail) throw new generateErrUtility('email already exists',409);
    //         } catch (error) {
    //             return next(error);
    //         }
    //     }
    //     if(ele === 'password') {
    //         try {
    //             newUser[ele] = await bcrypt.hash(req.body.password, 10);       // encrypt given password
    //             if(!newUser[ele]) throw new generateErrUtility('Signup failed!..try agin later',500);
    //         } catch (error) {
    //             return next(error);
    //         }
    //     }
    //     else newUser[ele] = req.body[ele];
    // }

    // if(typeof req.body.email !== 'undefined') {

    // const { body:newUser } = req;    // also creating shell copy
    // const newUser = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

        const existingEmail = await userModel.findOne({ email: req.body.email }, { _id: 1 }).lean();
        if(existingEmail) throw new generateErrUtility('Email already exists!',409);
    // }

    // const newUser = new req.body();
    // const newUser = Object.create(req.body);
    const newUser = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    // newUser.password = null;
    // console.log(newUser, req.body);
    delete newUser.password;
    // console.log(newUser, req.body);
    newUser.password = await bcrypt.hash(req.body.password, 10);       // encrypt given password
    if(!newUser.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);



    // const newUser = {};
    // for(let ele in req.body) {
    //     if(ele == 'password') {
    //         newUser[ele] = await bcrypt.hash(req.body.password, 10);
    //         continue;
    //     }
    //     newUser[ele] = req.body[ele];
    // }
    // console.log('body\n',req.body,'\nnewUser\n',newUser);
    // res.sendStatus(201);

    // try {

        // saving newly created object into db as a new user
        const response = await userModel.create(newUser);
        // res.status(201).json(response);
        if(!response) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        return(
            req.originalUrl === '/signup' ?
            res.status(201).send('Signup successful!') :
            res.status(201).json({
                msg: 'User added successfully!',
                user: response
            })
        );

    // } catch(err) {
        // const err = new Error('Signup failed!..try agin later',500);
        // res.status(409).json({message: err.message});
        // return next(err);
    // }

    // const newUserModel = new userModel(newUser);
    // try {
    //     await newUser.save();
    //     res.status(201).json(newUser);
    // } catch(err) {
    //     res.status(409).json({message: err.message});
    // }
});


export const updateUserController = tryCatchUtility(async (req, res) => {
    // const { body:updates, params } = req; // creating shell copy only, effects original object
    const { params } = req;

    if(req.body.email !== undefined) {
        const existingEmail = await userModel.findOne({ email: req.body.email, _id: { $nin: params.uid } }, { _id: 1 }).lean();
        if(existingEmail) throw new generateErrUtility('Email already exists!',409);
    }
    // console.log(existingEmail);
    // res.send(existingEmail);
    const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    if(updates.password !== undefined) {
        delete updates.password;
        updates.password = await bcrypt.hash(req.body.password, 10);       // encrypt given password
        if(!updates.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    }

    // const id = req.params.uid;
    // try {

        // saving newly created object into db as an update to an existing user document
        // const response = await userModel.findByIdAndUpdate(id).exec();
        const response = await userModel.findByIdAndUpdate(params.uid, updates, { new: true }).lean();
        if(!response) throw new generateErrUtility('Unable to update user!\nPlease try again later...',500);
        // console.log(response);
        // res.send('user updated successfully!');
    // } catch(err) {
        res.status(200).json({
            msg: 'User updated successfully!',
            updatedUser: response
        });
    // }
});


export const deleteUsersController = tryCatchUtility(async(req, res) => {
    // const id = req.params.uid;
    const { ids } = req.body;    // req.body.ids shud be an array of ids, this is also shell copying, of array
    // console.log('ids',ids);
    // try {
        // const users = await userModel.deleteMany();
        /*const response = [];
        // let response, nullCount = response = 0;
        // let response = 0;
        // let nullCount = 0;

        // deleting users having above given ids
        for(let id of ids)
            // response.push(await userModel.findByIdAndDelete(id).exec());
            response.push(await userModel.findByIdAndDelete(id));
            /*await userModel.findByIdAndDelete(id, (err) => {
                if(err) {
                    console.log(err);
                    nullCount++;
                }
                else response++;
            });*/
        // ids.forEach(async (id) => {
            // response.push(await userModel.findByIdAndDelete(id));
        // });

            // response.push(await userModel.deleteOne({ _id: id }).deletedCount);
        // const a = ['60d8ee58d2d9ff2a14c8a890'];
        // const response = [];
        // ids.forEach(tryCatchUtility(async (id) =>
            // { response.push(await userModel.deleteOne({ _id: id })); }
        // ));
        // const result = await userModel.deleteOne({ _id: id });
        // const result = await userModel.deleteMany({ $or: [{ _id: (() => {
            // forEach
        // })  }]});
        // let nullCount = 0;
        let deletedUsers = ids.length;
        // response.forEach(x => x ? '' /*nothing happens*/ : nullCount++ );

        // ids.forEach(async id => {    // cant handle err in this
        for(let id of ids) {
            const { deletedCount } = await userModel.deleteOne({ _id: id }).lean(); // || {};
            // if(!deletedCount) nullCount++;
            // console.log(deletedCount);
            if(!deletedCount) deletedUsers--;
        }
        // console.log(ids.length,deletedUsers);
        // console.log(ids.length,'\nresponse',response,'\nnullCount',nullCount);
        // if(response.length !== ids.length) throw new generateErrUtility('unable to delete users',404);
        // if(nullCount) throw new generateErrUtility(`deleted ${response} users only`,404);
        /*if(nullCount) {
            if(nullCount < ids.length ) throw new generateErrUtility(`Deleted ${ids.length - nullCount} users only!`,404);
            else throw new generateErrUtility(`No user deleted!`,404);
        }*/
        if(deletedUsers && deletedUsers < ids.length) throw new generateErrUtility(`Deleted ${deletedUsers} users only!`,404);
        if(!deletedUsers) throw new generateErrUtility(`No user deleted!`,404);
        // res.status(200).send('Your profile has been deleted successfully..\nGood Bye!');
        res.status(200).send('Users deleted successfully!');
    // } catch(err) {
    //     res.status(501).json({message: err.message});
    // }
});

