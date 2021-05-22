import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';


// const env_vars = dotenv.config().error ? console.log(dotenv.config().error.message) : dotenv.config().parsed;
// const env_vars = dotenv.config().error ? console.log({ error }) : { parsed };
// console.log("env_vars",env_vars);
const env_vars = dotenv.config();
if(env_vars.error) console.log(env_vars.error.message,"\n");
// process.on(exit(1));
// dotenv.config().then(() =>{
//     const env_vars = dotenv.config().parsed;
// }).catch((err) => console.log(err.message));


const app = express();
// app.close();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: "true"}));

app.use(cors());

app.use('/',routes);

const host = env_vars.parsed.HOST;
const port = env_vars.parsed.PORT || 6000;
const dbUrl = env_vars.parsed.DB_CON;

mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    app.listen(port);
    console.log(`Connection is established at http://${host}:${port}`);
}).catch((err) => console.log(err.message));


// ).then(() => 
//     app.listen(port, () => 
//         console.log(`Connection is established at http://${host}:${port}`)
// )).catch((err) => console.log(err.message));

// ).then(() => app.listen(port, () => 
//         console.log(`Connection is established and running on port: ${port}`)
//     )}).catch((err) => console.log(err.message));

mongoose.set('useFindAndModify',false);

