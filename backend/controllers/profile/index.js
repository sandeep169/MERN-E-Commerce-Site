// select from admin or user

import { getAdminProfileController, updateAdminProfileController, deleteAdminProfileController } from './adminProfile.js';
import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './userProfile.js';

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


function filter_user(req, res, next, adminFn, userFn) {
    const { user } = req;
    if(user !== undefined)
        return user.group === 'admin' ? adminFn(req,res,next) : userFn(req,res,next);
    throw new generateErrUtility('Not Found!',404);
}


export const getProfileController = (req, res, next) => {
    filter_user(req,res,next,getAdminProfileController,getUserProfileController);
};

export const updateProfileController = (req, res, next) => {
    filter_user(req,res,next,updateAdminProfileController,updateUserProfileController);
};

export const deleteProfileController = (req, res, next) => {
    filter_user(req,res,next,deleteAdminProfileController,deleteUserProfileController);
};

