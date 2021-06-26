import userModel from '../../models/user.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './userProfile.js';

export const getAdminProfileController = async (req, res) => { getUserProfileController(req, res); };
export const updateAdminProfileController = async (req, res) => { updateUserProfileController(req, res); };
export const deleteAdminProfileController = async (req, res) => { deleteUserProfileController(req, res); };

