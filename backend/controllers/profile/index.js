// select from admin or user

import { getAdminProfileController, updateAdminProfileController, deleteAdminProfileController } from './adminProfile.js';
import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './userProfile.js';

// import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


// const filter_user = tryCatchUtility((req, res, adminFn, userFn) => {
function filter_user(req, res, next, adminFn, userFn) {
    const { user } = req;          // when performing other opts
    if(user !== undefined)
        return user.group === 'admin' ? adminFn(req,res,next) : userFn(req,res,next);
    // return res.sendStatus('404');
    throw new generateErrUtility('Not Found!',404);
}


export const getProfileController = (req, res, next) => {

    filter_user(req,res,next,getAdminProfileController,getUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined')
    //     return user.group === 'admin' ? getAdminProfileController(req, res) : getUserProfileController(req, res);
    // return res.sendStatus('404');
};

export const updateProfileController = (req, res, next) => {

    filter_user(req,res,next,updateAdminProfileController,updateUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined')
    //     return user.group === 'admin' ? updateAdminProfileController(req, res) : updateUserProfileController(req, res);
    // return res.sendStatus('404');
};

export const deleteProfileController = (req, res, next) => {

    filter_user(req,res,next,deleteAdminProfileController,deleteUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined')
    //     return user.group === 'admin' ? deleteAdminProfileController(req, res) : deleteUserProfileController(req, res);
    // return res.sendStatus('404');
};
