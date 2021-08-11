import winston from 'winston';
const { createLogger, format, transports } = winston;
const { combine, timestamp, simple } = format;
const { Console, File, MongoDB } = transports;
import 'winston-mongodb';
import { config } from 'dotenv';

if(config().error) console.log(config().error.message);

const dbUrl = config().parsed.DB_CON;

export const errLogsUtility = createLogger({
    format: combine(timestamp(),simple()),
    transports: [    // 'transports' carry data from our application to different ends -  console or file or db
        new Console(),
        new File({ filename: 'error_logs' }),
        new MongoDB({
            db: dbUrl,
            options: { useUnifiedTopology: true },
            collection: 'error_logs',
        })
    ]
});

