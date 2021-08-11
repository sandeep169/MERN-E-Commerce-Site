export const tryCatchUtility = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);     // for try-catch not for '.then'(may be this only will work or some other code)
    };
};
