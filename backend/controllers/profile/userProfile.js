import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getUserProfileController = async (req, res) => {
    const role = req.user ? req.user.group : req.userRole;

    res.send(`yoo..its ${role} profile!\nrole: ${role}`);

};
export const updateUserProfileController = async (req, res) => {};
export const deleteUserProfileController = async (req, res) => {};
