"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.mysqlOptions = {
        database: 'mycargonautv1',
        host: 'localhost',
        password: '',
        user: 'root',
    };
    Configuration.sessionOptions = {
        cookie: {
            maxAge: 5 * 60 * 1000, // 1000ms * 60 (sec) * 5 (min)
        },
        name: 'SessionCarGonaut',
        resave: true,
        rolling: true,
        saveUninitialized: true,
        secret: 'secretword', // Encrypt session id using this modifier, e.g. 'Secret',
    };
    return Configuration;
}());
exports.Configuration = Configuration;
