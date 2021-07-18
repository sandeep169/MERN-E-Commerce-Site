import { errLogsUtility } from '../errHandling/errLogs.js';

export const printErrUtility = (err, req, res, next) => {
    const errFormat = {
        success: 0,
        statusCode: err.statusCode || 500
    };

    const workingEnv = process.env.WORK_ENV;

    if(workingEnv === 'prod') {
        errFormat.message = err.isOperational ? err.message : 'Something went wrong!';
        res.status(errFormat.statusCode).json({ error: errFormat });     // err sent to client
    }

    errFormat.message = err.message;
    errFormat.stack = err.stack;
    errFormat.workingEnv = workingEnv;

    if(workingEnv === 'dev')
        res.status(errFormat.statusCode).json({ error: JSON.stringify(errFormat, null, 4) });     // err sent to client

    errLogsUtility.error(JSON.stringify(errFormat, null, 4));        // err sent to errLogsUtility for further processes - console, file, db
};

