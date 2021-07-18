// for actions to be performed by authorized users only - admin/user/guest

import { getAdminHomeApi, getUserHomeApi, getGuestHomeApi } from '../../controllers/api.js';

import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

function filter_user(req, res, next, senior, junior, final) {
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
}

export const validateUserUtility = (req, res, next) => {
    const { originalUrl:url } = req;

    const login = /^\/login$/;        // string can be '/login' only
    if(login.test(url))
        return filter_user(req,res,next,getAdminHomeApi,getUserHomeApi);

    const home = /^\/(home)*$/;        // string can be '/' or '/home' only
    if(home.test(url))
        return filter_user(req,res,next,getAdminHomeApi,getUserHomeApi,getGuestHomeApi);

    const adminpanel = /^\/adminpanel/;        // string can be '/adminpanel....'
    if(adminpanel.test(url))
        return filter_user(req,res,next);

    throw new generateErrUtility('Bad Request!',400);
};

