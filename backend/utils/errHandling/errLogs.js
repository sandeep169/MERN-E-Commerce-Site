import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, timestamp, simple } = format;
const { Console, File, MongoDB } = transports;
import 'winston-mongodb';
import { config } from 'dotenv';

// import dbUrl from '../server.js';
// console.log(dbUrl);
// console.log(dotenv.config({ path: './utils/.env' }).parsed.DB_CON);
// console.log("->",config());

if(config().error) console.log(config().error.message);

const dbUrl = config().parsed.DB_CON;

export const errLogsUtility = createLogger({
    // level: 'error',
    format: combine(timestamp(),simple()),
    transports: [    // 'transports' carry data from our application to different ends -  console or file or db
        new Console(),
        new File({
            // level: 'error',
            filename: 'error_logs',
            // format: format.combine(format.timestamp(),format.simple())
        }),
        new MongoDB({
            // level: 'error',
            db: dbUrl,
            options: { useUnifiedTopology: true },
            collection: 'error_logs',
            // format: format.combine(format.timestamp(),format.simple())
        })
    ]
});
