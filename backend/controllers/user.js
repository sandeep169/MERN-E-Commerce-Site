import userModel from '../models/user.js';


export const addUserController = async (req, res) => {
    res.send(req.body);
    console.log('body',req.body);
};
export const getUserController = async (req, res) => {
    res.send('successful');    
};
export const updateUserController = async (req, res) => {};
export const deleteUserController = async (req, res) => {};

