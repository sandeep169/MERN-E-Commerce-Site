// show admin-panel home

import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getAdminPanelController = async (req, res) => {
    const group = req.user ? req.user.group : req.userRole;

    res.send(`yoo..its admin panel!\nrole: ${group}`);
};
