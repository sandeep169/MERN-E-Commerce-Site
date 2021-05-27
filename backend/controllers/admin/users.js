import userModel from '../../models/user.js';


export const getUsersController = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(302).json(user);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
};


export const addUserController = async (req, res) => {
    const newUser = new userModel(req.body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(409).json({message: err.message});
    }
    // res.send(req.body);
    // console.log('body',req.body);
};


export const updateUserController = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.findByIdAndUpdate(id).exec();
        res.send('Profile updated successfully!');
    } catch(err) {
        res.status(304).json({message: err.message});
    }
};


export const deleteUsersController = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.findByIdAndRemove(id).exec();
        res.send('Your profile has been deleted successfully..\nGood Bye!');
    } catch(err) {
        res.status(501).json({message: err.message});
    }
};

