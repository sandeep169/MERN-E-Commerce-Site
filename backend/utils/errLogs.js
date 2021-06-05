import winston from 'winston';
const { createLogger, transports, format } = winston;
import winston_mongodb from 'winston-mongodb';
import { config } from 'dotenv';

// import dbUrl from '../server.js';
// console.log(dbUrl);
// console.log(dotenv.config({ path: './utils/.env' }).parsed.DB_CON);
// console.log("->",config());

if(config().error) console.log(config().error.message);

const dbUrl = config().parsed.DB_CON;

export const errLogsUtility = createLogger({
    transports: [    // 'transports' carry data from our application to console or file or db
        new transports.Console({
            level: 'error',
            format: format.combine(format.timestamp(),format.simple())
        }),
        new transports.File({
            level: 'error',
            filename: 'error_logs',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db: dbUrl,
            options: { useUnifiedTopology: true },
            collection: 'error_logs',
            format: format.combine(format.timestamp(),format.json())
        })
    ]
});
