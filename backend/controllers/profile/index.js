// select from admin or user

import { getAdminProfileController, updateAdminProfileController, deleteAdminProfileController } from './adminProfile.js';
import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './userProfile.js';

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

function filter_user(req, res, adminFn, userFn) {
    const user = req.user;          // when performing other opts
    if(typeof user !== 'undefined') 
        return user.group === 'admin' ? adminFn(req, res) : userFn(req, res);
    // return res.sendStatus('404');
    throw new generateErrUtility('Not Found',404);
}

export const getProfileController = async (req, res) => {

    filter_user(req,res,getAdminProfileController,getUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined') 
    //     return user.group === 'admin' ? getAdminProfileController(req, res) : getUserProfileController(req, res);
    // return res.sendStatus('404');
};

export const updateProfileController = async (req, res) => {

    filter_user(req,res,updateAdminProfileController,updateUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined') 
    //     return user.group === 'admin' ? updateAdminProfileController(req, res) : updateUserProfileController(req, res);
    // return res.sendStatus('404');
};

export const deleteProfileController = async (req, res) => {
    
    filter_user(req,res,deleteAdminProfileController,deleteUserProfileController);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined') 
    //     return user.group === 'admin' ? deleteAdminProfileController(req, res) : deleteUserProfileController(req, res);
    // return res.sendStatus('404');
};
