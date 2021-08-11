import bcrypt from 'bcryptjs';

import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


export const getUsersController = tryCatchUtility(async (req, res) => {
    const response = await userModel.find().lean();
    if(!response.length) throw new generateErrUtility('No user found!',404);
    res.status(200).json({ users: response });
});

export const addUserController = tryCatchUtility(async (req, res) => {
    // checking if email already exists
    const existingEmail = await userModel.findOne({ email: req.body.email }, { _id: 1 }).lean();
    if(existingEmail) throw new generateErrUtility('Email already exists!',409);

    const newUser = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    // encrypting password and adding it into user body
    delete newUser.password;
    newUser.password = await bcrypt.hash(req.body.password, 10);
    if(!newUser.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);

    // saving new user into user model
    const response = await userModel.create(newUser);
    if(!response) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);

    return(
        req.originalUrl === '/signup' ?
        res.status(201).send('Signup successful!') :
        res.status(201).json({
            msg: 'User added successfully!',
            user: response
        })
    );
});

export const updateUserController = tryCatchUtility(async (req, res) => {
    const { params } = req;

    // checking if email already exists
    if(req.body.email !== undefined) {
        const existingEmail = await userModel.findOne({ email: req.body.email, _id: { $nin: params.uid } }, { _id: 1 }).lean();
        if(existingEmail) throw new generateErrUtility('Email already exists!',409);
    }

    const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    // encrypting password and adding it into user body
    if(updates.password !== undefined) {
        delete updates.password;
        updates.password = await bcrypt.hash(req.body.password, 10);
        if(!updates.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    }

    // updating existing user in user model
    const response = await userModel.findByIdAndUpdate(params.uid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to update user!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'User updated successfully!',
        updatedUser: response
    });
});

export const deleteUsersController = tryCatchUtility(async(req, res) => {
    const { ids } = req.body;    // req.body.ids shud be an array of ids, this is also shell copying, of array

    // deleting all requested users(whose ids has been sent in []) one by one
    let deletedUsers = ids.length;
    for(let id of ids) {
        const { deletedCount } = await userModel.deleteOne({ _id: id }).lean();
        if(!deletedCount) deletedUsers--;
    }

    if(deletedUsers && deletedUsers < ids.length) throw new generateErrUtility(`Deleted ${deletedUsers} users only!`,404);
    if(!deletedUsers) throw new generateErrUtility(`No user deleted!`,404);

    res.status(200).send('Users deleted successfully!');
});

