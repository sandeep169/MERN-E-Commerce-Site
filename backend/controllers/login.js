import userModel from '../models/user.js';

export const verifyLoggerController = async (req, res) => {
    
};

export const getAdminHomeController = async (req, res) => {
    res.send('yoo..its admin!');
};

export const getUserHomeController = async (req, res) => {
    res.send('yoo..its user!');
};
