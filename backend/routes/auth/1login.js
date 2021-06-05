import express from 'express';
import { verifyLoggerApi, getAdminHomeApi, getUserHomeApi } from '../../controllers/api.js';

const app = express();
// const router = express.Router();
// pass user credentials and verify its authenticity and ownership:-

// X-----X-----X
// const validity = verifyLoggerApi().then(x => console.log(x));
// const validity = (req,res) => verifyLoggerApi(req,res).then(x => console.log(x));

// ✓-----✓-----✓
let y;
const validity = (req,res) => verifyLoggerApi(req,res).then(x => {
    y = x;
    console.log("y",y);
    if(y === 'admin')
        app.use('/',getAdminHomeApi);      // also set env var for not requiring user creds. again
}).catch(() => {
    console.log('errrrrrrrrrrrrrr');
});

// ✓-----✓-----✓
// let validity;
// (async () => {
//     try {
//         validity = (req,res) => verifyLoggerApi(req,res).then(x => console.log("x",x));
//         // validity = await verifyLoggerApi;
//         console.log('validity',validity);
//     } catch(err) {
//         console.log('errrrrrrrrrrrrrr');
//     }
// })();

// let validity;
// app.use('/',(req,res) => {
//     verifyLoggerApi(req,res).then(validity => {
//         console.log(validity);
//         // console.log("eval $(export OWNERSHIP=validity)");
//         if(validity && validity === 'admin')
//             // getAdminHomeApi(req,res);
//             // getAdminHomeApi(req,res.setHeader(Content-Type, application/json));
//             app.use('/',getAdminHomeApi);      // also set env var for not requiring user creds. again
//         else if(validity && validity === 'user')
//             app.use('/',getUserHomeApi);      // also set env var for not requiring user creds. again
//         // else res.send("invalid credentials");
//     }).catch(() => {
//         // console.log('errrrrrrr');
//         res.send("invalid credentials");
//     });
// });
// console.log('validity',validity);
console.log('y1',y);

// X-----X-----X
// let validity;
// (async (req,res) => {
//     try {
//         const y = () => verifyLoggerApi(req,res).then(x => {
//             console.log("x",x);
//             validity = x;
//         });
//         // validity = await verifyLoggerApi();
//         // console.log('validity',validity);
//     } catch(err) {
//         console.log('errrrrrrrrrrrrrr');
//     }
// })();

// X-----X-----X
// let validity;
// const y = (req,res) => verifyLoggerApi(req,res).then(x => {
//     console.log("x",x);
//     validity = x;
// }).catch(() => console.log('errrrrrrrrrrrrrr'));





// if(req.body.ownership === 'admin')
// if(validity && validity === 'admin')
// {
    // const ownership = validity;
    // app.use('/',getAdminHomeApi);      // also set env var for not requiring user creds. again
// }
    
// if(req.body.ownership === 'user')
// else if(validity && validity === 'user')
// {
    // const ownership = 'user';
    // app.use('/',getUserHomeApi);      // also set env var for not requiring user creds. again
// }
// else res.send("invalid credentials");

// export default validity ? validity : "invalid";
// export default validity;
export default app;
export {validity};

