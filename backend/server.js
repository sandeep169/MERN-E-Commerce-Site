import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import { config } from 'dotenv';
import { errLogsUtility } from './utils/errLogs.js';

if(config().error) errLogsUtility.error(config().error.message);
    // console.log("->",config().error.message,"\n");

const app = express();

app.use(bodyParser.json());     // sending data as json (in lang like js) more useful
// app.use(bodyParser.urlencoded({extended: "true"}));      // sending data as urlencoded (in lang like php) less useful

app.use(cors());

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',routes);

const { HOST: host, DB_CON: dbUrl } = config().parsed;
const port = config().parsed.PORT || 6000;

mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    app.listen(port);
    console.log(`Connection is established at http://${host}:${port}`);
}).catch((err) => errLogsUtility.error(err.message));

mongoose.set('useFindAndModify',false);
