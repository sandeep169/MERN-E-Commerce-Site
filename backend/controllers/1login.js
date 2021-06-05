import userModel from '../models/user.js';

export const verifyLoggerController = async (req, res) => {
    console.log('vlc1');
    try {
        console.log('vlc2');
        res.send(req.body);
        if(req.body.a == 'b') return "admin";
        else if(req.body.a == 'c') return "user";
        // else return "user";
        // req.body.a === 'b' ? return "admin" : return "user";
    } catch(err) {
        // console.log(err);
        console.log("throwing err away");
        throw err;      // throws away the generated err so it wont print on console instead we can display our msg
    }
    // res.send(req.body);
    // if(req.body.a == 'b') return "admin";
    // else return "user";
};

export const getAdminHomeController = async (req, res) => {
    res.send('yoo..its admin!');
};

export const getUserHomeController = async (req, res) => {
    res.send('yoo..its user!');
};
