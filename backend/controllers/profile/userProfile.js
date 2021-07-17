import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getUserProfileController = tryCatchUtility(async (req, res) => {
    // const role = req.user ? req.user.group : req.userRole;
    // res.send(`yoo..its ${role} profile!\nrole: ${role}`);

    // res.status(200).send(req.user);
    const response = await userModel.findById(req.user.userid).lean();
    if(!response) throw new generateErrUtility('Profile not found!',404);
    res.status(200).json({ profile: response });
});

export const updateUserProfileController = tryCatchUtility(async (req, res) => {
    // exactly same as adminpanel/users - updateUserController
    const { user } = req;

    if(req.body.email !== undefined) {
        const existingEmail = await userModel.findOne({ email: req.body.email, _id: { $nin: user.userid } }, { _id: 1 }).lean();
        // await userModel.findOne({ email: req.body.email, _id: { $nin: req.user.userid }}, (err, user) => {
            // if(user) {
            // const err = new generateErrUtility('Email already exists!',409);
            // return next(err); }
        // });
        if(existingEmail) throw new generateErrUtility('Email already exists!',409);
        // if(existingEmail) {
            // const err = new generateErrUtility('Email already exists!',409);
            // return next(err); }
    }

    const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    if(updates.password !== undefined) {
        delete updates.password;
        updates.password = await bcrypt.hash(req.body.password, 10);       // encrypt given password
        if(!updates.password) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    }

    const response = await userModel.findByIdAndUpdate(user.userid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to update profile!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'Profile updated successfully!',
        updatedProfile: response
    });
});

export const deleteUserProfileController = tryCatchUtility(async (req, res) => {
    const { deletedCount } = await userModel.deleteOne({ _id: req.user.userid }).lean(); // || {};
    // console.log(response);
    if(!deletedCount) throw new generateErrUtility('Unable to delete profile!\nPlease try again later...',404);
    res.status(200).send('Profile deleted successfully!');
    // after profile deletion, logout(destroy this users token) & redirect to home page
});

