import express from 'express';
import { verifyLoggerApi, getAdminHomeApi, getUserHomeApi } from '../../controllers/api.js';

const app = express();

// pass user's credentials and verify his authenticity and ownership:-
const validity = (req,res) => verifyLoggerApi(req,res).then(x => console.log(x));

// if(req.body.ownership === 'admin')
if(validity && validity === 'admin')
{
    // const ownership = validity;
    app.use('/',getAdminHomeApi);      // also set env var for not requiring user creds. again
}
    
// if(req.body.ownership === 'user')
else if(validity && validity === 'user')
{
    // const ownership = 'user';
    app.use('/',getUserHomeApi);      // also set env var for not requiring user creds. again
}
// else res.send("invalid credentials");

// export default validity ? validity : "invalid";
// export default validity;
export default app;
// export {validity};

