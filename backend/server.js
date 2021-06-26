import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
// import multer from 'multer';

import routes from './routes/index.js';
import { errLogsUtility } from './utils/errHandling/errLogs.js';

if(config().error) errLogsUtility.error(config().error.message);
    // console.log("->",config().error.message,"\n");

const app = express();
// const upload = multer();
// const upload = multer({ dest: '../../images/products'});

app.use(bodyParser.json());     // for parsing application/json, sending data as json (in lang like js), more useful
app.use(bodyParser.urlencoded({extended: "true"}));      // for parsing application/xwww-form-urlencoded, sending data as urlencoded (in lang like php), less useful
// app.use(upload.array());        // for parsing multipart/form-data

app.use(cors());

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
