import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getUserProfileController = tryCatchUtility(async (req, res) => {
    const response = await userModel.findById(req.user.userid).lean();
    if(!response) throw new generateErrUtility('Profile not found!',404);
    res.status(200).json({ profile: response });
});

export const updateUserProfileController = tryCatchUtility(async (req, res) => {
    const { user } = req;

    if(req.body.email !== undefined) {
        const existingEmail = await userModel.findOne({ email: req.body.email, _id: { $nin: user.userid } }, { _id: 1 }).lean();
        if(existingEmail) throw new generateErrUtility('Email already exists!',409);
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
    const { deletedCount } = await userModel.deleteOne({ _id: req.user.userid }).lean();
    if(!deletedCount) throw new generateErrUtility('Unable to delete profile!\nPlease try again later...',404);
    res.status(200).send('Profile deleted successfully!');
});

