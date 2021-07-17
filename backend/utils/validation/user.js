// for actions to be performed by authorized users only - admin/user/guest

// import express from 'express';
// import adminRoute from '../../routes/admin/admin.js';
// import userRoute from '../../routes/user/user.js';
// import { getGuestHomeApi } from '../../controllers/api.js';

import { getAdminHomeApi, getUserHomeApi, getGuestHomeApi } from '../../controllers/api.js';
// import { tryCatchUtility } from '../errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


function filter_user(req, res, next, senior, junior, final) { // , final) {
    // const { user, userRole:role } = req;
    // const access = (user ? user.group : undefined) || role;
    const { user: { group } = {}, userRole:role } = req;
    const access = group || role;

    function err(msg,code){ throw new generateErrUtility(msg,code); }

    if(access !== undefined)
        return(
            access === 'admin' ?
            (typeof senior === 'function' ? senior(req, res) : next()) :
            (typeof junior === 'function' ? junior(req, res) : err('Forbidden!',403))
        );
    return typeof final === 'function' ? final(req, res) : err('Unauthorized!',401);

    // const { group } = user; // || undefined;
    // console.log('1 ->',user,'\n2 ->',role);
    // if(typeof group !== 'undefined' || typeof role !== 'undefined' )
        // return group || role === 'admin' ? valid : invalid;

    // if(typeof (group && role) === 'undefined') return final;
    // if(typeof user.group === 'undefined' && typeof role === 'undefined') return final;
    // if(typeof (group || role) !== 'undefined')
        // return (group || role) === 'admin' ? valid(req, res) : invalid(req, res);
    // return final(req, res);

    // return user.group === 'admin' ? adminFn(req, res) : userFn(req, res);
        // return user.group === 'admin' ? console.log('-> admin') : console.log('-> user');
    // if(typeof userRole !== 'undefined')
        // return role === 'admin' ? valid : invalid;

    // console.log('5 ->',typeof ,'\n6 ->',typeof valid);
}

// const filter_user = tryCatchUtility((req, res, next, senior, junior, final) => { // , final) {
//     if(typeof access !== 'undefined') {
//         if(access === 'admin') {
//             if(typeof senior !== 'function') return next();
//             return senior(req, res);
//         }
//         if(typeof junior !== 'function') throw new generateErrUtility('',403);
//         return junior(req, res);
//     }

//     // return typeof final === 'function' ? final(req, res) : throw new generateErrUtility('',401);
//     if(typeof final !== 'function') throw new generateErrUtility('',401);
//     return final(req, res);
// });

export const validateUserUtility = (req, res, next) => {
    const { originalUrl:url } = req;
    const login = /^\/login$/;        // string can be '/login' only
    // if(req.originalUrl === '/login')
    if(login.test(url))
    {
        return filter_user(req,res,next,getAdminHomeApi,getUserHomeApi); //,res.sendStatus(401));
        // const role = req.userRole;
        // if(typeof role !== 'undefined')
        //     return role === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res);
        // return res.sendStatus(401);
    }

    // regex = /^\/home$/;        // string can be '/home' only
    const home = /^\/(home)*$/;        // string can be '/' or '/home' only
    // if(req.originalUrl === '/home')
    if(home.test(url))
    {
        // filter_user(req,res,next,getAdminHomeApi(req, res),getUserHomeApi(req, res),getGuestHomeApi(req, res));
        return filter_user(req,res,next,getAdminHomeApi,getUserHomeApi,getGuestHomeApi); // ,getGuestHomeApi);
        // filter_user(req,res,obj.fn1,obj.fn2);
        // const user = req.user;
        // if(typeof user !== 'undefined')
            // return user.group === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res);
        // return getGuestHomeApi(req, res);
    }

    const adminpanel = /^\/adminpanel/;        // string can be '/adminpanel....'
    // if(req.originalUrl === '/adminpanel')
    if(adminpanel.test(url))
    {
        return filter_user(req,res,next); // ,next(),res.sendStatus(403),res.sendStatus(401));
        // filter_user(req,res,next,obj.fn1,obj.fn2);
        // const user = req.user;
        // if(typeof user !== 'undefined')
        //     return user.group === 'admin' ? next() : res.sendStatus(403);
        // return res.sendStatus(401);
    }

    throw new generateErrUtility('Bad Request!',400);
};


// const app = express();
// const router = express.Router();
// router.use('/user',userRoute);

// export const validateUserUtility1 = (req, res) => {
    // console.log('->role',req.userRole);
    // res.send('role',req.userRole);
// returnapp.use('/user',userRoute);
    // const user = req.user;          // when performing other opts
    // if(typeof user !== 'undefined')
        // return user.group === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res);

    // const role = req.userRole;      // when loging in
    // if(typeof role !== 'undefined')
        // res.redirect();
        // const Route = `${role} + Route`;
        // return router.use('/',userRoute);
        // return router.use('/',eval(`${role}Route`));
        // return role === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res);
        // role === 'admin' ? export default adminRoute : userRoute;
        // return role === 'admin' ? res.redirect('/admin') : res.redirect('/user');
        // if(role === 'admin') {
            // console.log('adminRoute redirect');
            // return res.send('GET').redirect('/admin');
            // req.method = 'GET';
            // req.route.stack[0].method = 'get';
            // req.route.stack[1].method = 'get';
            // delete req.route.methods.post;
            // req.route.methods.get = true;
            // console.log(req);
            // console.log(req.method);
            // req.get('Content-Type');
            // return res.redirect('/admin');
            // return req.router.get('/admin');

        // }
        // else{
        //     console.log('userRoute redirect');
        //     return res.redirect('/user');
        //     // return req.router.get('/user');
        // }
        // return role === 'admin' ? res.send(adminRoute) : (() => {
            // req.session.returnTo = req.path;
            // res.redirect('/user');
        // });
        // return role === 'admin' ? res.send(adminRoute) : router.use('/',userRoute);
        // return (role === 'admin' ? router.use(adminRoute) : () => {
            // router.use('')
            // res.redirect('./user'
        // });
        // return (role === 'admin' ? router.use(adminRoute) : userRoute(req, res));
        /* return(role, () => {
            console.log(role);
           try {
            //    role === 'admin' ? adminRoute() : userRoute();
            if(role === 'admin')
                // router.use('/',adminRoute);
                // adminRoute(req, res);
                // app.use(express.static('adminRoutes'));
                res.send(adminRoute);
            else
                // router.use('/',userRoute);
                // userRoute(req, res);
                // app.use(express.static('userRoute'));
                res.send(userRoute);
           } catch (error) {
                console.log(error);
           }
        }); */

    // getGuestHomeApi(req, res);




    // const user = req.user;

    // if(typeof user === 'undefined') return getGuestHomeApi(req, res);

    // return (user.group === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res));

    /*
    const role = 'user';
    req.userRole = 'user';
    switch (role) {
        case 'admin':
            // return res.redirect(getAdminHomeApi());
            // app.use('/',getAdminHomeApi);
            return getAdminHomeApi(req, res);

            // break;

        case 'user':
            // return res.redirect(getUserHomeApi());
            // app.use('/',getUserHomeApi);
            return getUserHomeApi(req, res);

            // break;

        default:
            // return res.redirect(getGuestHomeApi());
            // app.use('/',getGuestHomeApi);
            return getGuestHomeApi(req, res);

            // break;
    }*/

// };



// export const validateUserUtility2 = (req, res) => {
//     const user = req.user;          // when performing other opts
//     if(typeof user !== 'undefined')
//         return user.group === 'admin' ? getAdminProfileApi(req, res) : getUserProfileApi(req, res);

    // const role = req.userRole;      // when loging in
    // if(typeof role !== 'undefined')
        // return role === 'admin' ? getAdminHomeApi(req, res) : getUserHomeApi(req, res);

// };
