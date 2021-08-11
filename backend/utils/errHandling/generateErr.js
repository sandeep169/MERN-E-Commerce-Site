export class generateErrUtility extends Error {    // Error is a inbuilt JS class
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;      // cant print err if set to false, generally used to hide err containing sensitive info.

        Error.captureStackTrace(this, this.constructor);    // calling object 'captureStackTrace' of cls 'Error' to display the line of file containing the err
    }
}
