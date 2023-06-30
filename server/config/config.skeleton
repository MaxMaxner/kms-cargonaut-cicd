import { SessionOptions } from 'express-session';
import { ConnectionConfig } from 'mysql';

export class Configuration {

    public static mysqlOptions: ConnectionConfig = {
        database: 'mycargonaut',
        host: 'localhost',
        password: '',
        user: 'root',
    };

    public static sessionOptions: SessionOptions = {
        cookie: {
            maxAge: 5 * 60 * 1000, // 1000ms * 60 (sec) * 5 (min)
        },
        name: 'SessionCarGonaut',
        resave: true, // save with new time stamp (for operating systems without 'touch' command)
        rolling: true, // re-generate the cookie on every request
        saveUninitialized: true, // save session even if it stores no data
        secret: 'secretword', // Encrypt session id using this modifier, e.g. 'Secret'
    };

}
