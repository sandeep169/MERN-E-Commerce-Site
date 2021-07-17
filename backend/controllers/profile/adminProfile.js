// import userModel from '../../models/user.js';

// import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
// import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './userProfile.js';

export const getAdminProfileController = getUserProfileController;
export const updateAdminProfileController = updateUserProfileController;
export const deleteAdminProfileController = deleteUserProfileController;

