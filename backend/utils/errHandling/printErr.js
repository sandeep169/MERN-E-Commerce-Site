import { errLogsUtility } from '../errHandling/errLogs.js';

export const printErrUtility = (err, req, res, next) => {
    // console.log("->",err);   // err sent by user defined class 'generateErrUtility'

    const errFormat = {
        success: 0,             // dev, prod
        // message: err.message,   // dev, prod(isOperational)
        // stack: err.stack,       // dev
        statusCode: err.statusCode || 500,      // dev, prod
        // workingEnv: workingEnv  // dev
    };

    const workingEnv = process.env.WORK_ENV;

    if(workingEnv === 'prod') {
        // if(!err.isOperational)       // we may leak some sensitive info in err msg on production level if 'isOperational' is false
        //     errFormat.message = 'something went wrong';    // so changing err msg
        // else errFormat.message = err.message;   //  if 'isOperational' is true
        errFormat.message = err.isOperational ? err.message : 'something went wrong';
        res.status(errFormat.statusCode).json(errFormat);     // err sent to client
    }

    errFormat.message = err.message;
    errFormat.stack = err.stack;
    errFormat.workingEnv = workingEnv;
    
    // console.log("->",errFormat);
    if(workingEnv === 'dev')
        res.status(errFormat.statusCode).json(JSON.stringify(errFormat, null, 4));     // err sent to client
    
        // res.status(errFormat.statusCode).json()
        // .then(() => {
        //     console.log(errFormat);
        //     JSON.stringify(errFormat).replace(',', ',\n');

        // }).catch(err => console.log(err.message));



        // () => {
            // console.log(errFormat);

            // JSON.stringify(errFormat).replace(',', ',\n');
            // JSON.parse(errFormat);
            // return errFormat;
        // });     // err sent to client

    errLogsUtility.error(JSON.stringify(errFormat, null, 4));        // err sent to errLogsUtility for further processes - console, file, db
};

// err display -> client pg, console, file, db


// const statusCode = err.statusCode || 500;   // 500 - internal server err
// const errFormat = {
//     success: 0,
//     message: err.message,
//     stack: err.stack
// };
// res.status(statusCode).json(errFormat);
// errFormat.statusCode = statusCode;
// errLogsUtility.error(errFormat);
