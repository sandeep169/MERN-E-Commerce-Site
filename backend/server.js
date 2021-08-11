import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

import routes from './routes/index.js';
import { errLogsUtility } from './utils/errHandling/errLogs.js';

if(config().error) errLogsUtility.error(config().error.message);

const app = express();

app.use(bodyParser.json());     // for parsing application/json, sending data as json (in lang like js), more useful
app.use(bodyParser.urlencoded({extended: "true"}));      // for parsing application/xwww-form-urlencoded, sending data as urlencoded (in lang like php), less useful

app.use(cors());

app.use('/',routes);

const { HOST:host, PORT:port=6000, DB_CON:dbUrl } = config().parsed;

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
}).catch(err => errLogsUtility.error(err.message));

mongoose.set('useFindAndModify',false);

