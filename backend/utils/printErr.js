import { errLogsUtility } from '../utils/errLogs.js';

export const printErrUtility = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;   // 500 - internal server err
    const errFormat = {
        success: 0,
        message: err.message,
    };

    const workingEnv = process.env.WORK_ENV;
    if(workingEnv === 'dev')
        errFormat.stack = err.stack;

    if(workingEnv === 'prod')
        if(!err.isOperational)       // we may leak some sensitive info in err msg on production level if its true
            errFormat.message = 'something went wrong';     // so changing err msg

    res.status(statusCode).json(errFormat);
    errFormat.statusCode = statusCode;
    errFormat.workingEnv = workingEnv;
    errLogsUtility.error(errFormat);
};

// const statusCode = err.statusCode || 500;   // 500 - internal server err
// const errFormat = {
//     success: 0,
//     message: err.message,
//     stack: err.stack
// };
// res.status(statusCode).json(errFormat);
// errFormat.statusCode = statusCode;
// errLogsUtility.error(errFormat);
