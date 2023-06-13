import express = require ('express');
import bodyParser = require ('body-parser');
import {Request, Response} from 'express';

import {Configuration} from './config/config';
import {Connection, MysqlError} from "./node_modules/mysql";
import mysql = require ("./node_modules/mysql");
import cryptoJS = require ("./node_modules/crypto-js");
import session = require ('./node_modules/express-session');

const router = express();
const database: Connection = mysql.createConnection(Configuration.mysqlOptions);

let server = router.listen(8080, function () {
    console.log('Server started: http://localhost:8080');
});

router.use(bodyParser.json());
router.use(session(Configuration.sessionOptions));

//---- connect to database ----------------------------------------------------
database.connect((err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});

/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
const basedir: string = __dirname + '/../..';  // get rid of /server/src
router.use('/', express.static(basedir + '/client/views'));
router.use('/css', express.static(basedir + '/client/css'));
router.use('/src', express.static(basedir + '/client/src'));
router.use('/jquery', express.static(basedir + '/client/node_modules/jquery/dist'));
router.use('/popperjs', express.static(basedir + '/client/node_modules/popper.js/dist'));
router.use('/bootstrap', express.static(basedir + '/client/node_modules/bootstrap/dist'));
router.use('/font-awesome', express.static(basedir + '/client/node_modules/font-awesome'));


/*****************************************************************************
 * Middleware routes for session management (login and authentication)       *
 *****************************************************************************/
/**
 * @apiDefine SessionExpired
 *
 * @apiError (Client Error) {401} SessionNotFound The session of the user is expired or was not set
 *
 * @apiErrorExample SessionNotFound:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message":"Nicht eingeloggt."
 * }
 */
function loginCheck() {
    // Abstract middleware route for checking login state of the user
    return (req: Request, res: Response, next) => {
        // @ts-ignore
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        } else {
            // User is not logged in
            res.status(401).send({
                message: 'Nicht eingeloggt',
            });
        }
    };
}


/*****************************************************************************
 * HTTP ROUTES: LOGIN                                                        *
 *****************************************************************************/
/**
 * @api {get} /login Request login state
 * @apiName GetLogin
 * @apiGroup Login
 * @apiVersion 2.0.0
 *
 * @apiSuccess {User} user The user object
 * @apiSuccess {string} message Message stating that the user is still logged in
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "user":{
 *         "id":1,
 *         "vorname":"Admin",
 *         "nachname":"Admin",
 *         "email": "admin@webmail.com"
 *         "creationTime":"2017-11-12T09:33:25.000Z",
 *     },
 *      "message":"Nutzer ist eingeloggt."
 *  }
 *
 * @apiError (Client Error) {401} SessionNotFound The session of the user is expired or was not set
 *
 * @apiErrorExample SessionNotFound:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message":"Session expired, please log in again."
 * }
 */
router.get('/login', loginCheck(), (req: Request, res: Response) => {
    // @ts-ignore
    // @ts-ignore
    res.status(200).send({
        message: 'User still logged in',
        user: req.session.user, // Send user object to client for greeting message
    });
});

/**
 * @api {post} /login Send login request
 * @apiName PostLogin
 * @apiGroup Login
 * @apiVersion 2.0.0
 *
 * @apiParam {string} email Email of the user to log in
 * @apiParam {string} password Password of the user to log in
 *
 * @apiSuccess {string} message Message stating the user logged in successfully
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "user":{
 *         "id":1,
 *         "vorname":"Admin",
 *         "nachname":"Admin",
 *         "email": "admin@webmail.com"
 *         "creationTime":"2017-11-12T09:33:25.000Z",
 *     },
 *     "message":"Erfolgreich eingeloggt"
 * }
 *
 * @apiError (Client Error) {401} LoginIncorrect The login data provided is not correct.
 * @apiError (Server Error) {500} DatabaseRequestFailed The request to the database failed.
 *
 * @apiErrorExample LoginIncorrect:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message":"Mail oder Password ist nicht korrekt."
 * }
 *
 *
 * @apiErrorExample DatabaseRequestFailed:
 * HTTP/1.1 500 Internal Server Errror
 * {
 *     "message":"Database request failed: ..."
 * }
 */
router.post('/login', (req: Request, res: Response) => {
    // Read data from request
    const email: string = req.body.email;
    const password: string = req.body.password;

    // Create database query and data
    const data: [string, string] = [email, cryptoJS.SHA512(password).toString()];
    const query: string = 'SELECT * FROM Benutzer WHERE Email = ? AND Passwort = ?;';

    // request user from database
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        } else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                // Login data is correct, user is logged in
                const user = (rows[0].id,
                    rows[0].vorname,
                    rows[0].nachname,
                    rows[0].email,
                    String(new Date(rows[0].time)));
                req.session.user = user; // Store user object in session for authentication
                res.status(200).send({
                    message: 'Erfolgreich eingeloggt',
                    user, // Send user object to client for greeting message
                });
            } else {
                // Login data is incorrect, user is not logged in
                res.status(401).send({
                    message: 'E-Mail oder Password ist nicht korrekt.',
                });
            }
        }
    });
});

/**
 * @api {post} /logout Logout user
 * @apiName PostLogout
 * @apiGroup Logout
 * @apiVersion 2.0.0
 *
 * @apiSuccess {string} message Message stating that the user is logged out
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     message: "Erfolgreich ausgeloggt"
 * }
 */
router.post('/logout', (req: Request, res: Response) => {
    // Log out user
    // @ts-ignore
    delete req.session.user; // Delete user from session
    res.status(200).send({
        message: 'Erfolgreich ausgeloggt',
    });
});


/*****************************************************************************
 * HTTP ROUTES: USER, USERS                                                  *
 *****************************************************************************/
/**
 * @api {post} /user Create a new user
 * @apiName postUser
 * @apiGroup User
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 * @apiUse NotAuthorized
 *
 * @apiParam {string} Vorname - Firast name of the user
 * @apiParam {string} Nachname Last name of the user
 *
 * @apiSuccess {string} message Message stating the new user has been created successfully
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "message":"Nutzer wurder erfolgreich angelegt"
 * }
 *
 * @apiError (Client Error) {400} NotAllMandatoryFields The request did not contain all mandatory fields
 *
 * @apiErrorExample NotAllMandatoryFields:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message":"Nicht alle Felder gefüllt!"
 * }
 */
router.post('/user', (req: Request, res: Response) => {
    // Read data from request body
    const vorname: string = req.body.vorname;
    const nachname: string = req.body.nachname;
    const email: string = req.body.email;
    const password: string = cryptoJS.SHA512(req.body.password).toString();
    const birthday: string = req.body.birthday;

    // add a new user if first- and lastname exist
    if (vorname && nachname) {
        // Create new user
        // Create database query and data
        const data: [string, string, string, string, string, Date ] = [

            vorname, nachname, email, password, birthday,   new Date(),]; // As standard, any new user has rights Rights.User
        const query: string = "INSERT INTO `Benutzer` ( `Vorname`, `Nachname`, `Email`, `Passwort`, `Geburtstag`, `ErstelltAm`) VALUES (?, ?, ?, ?, ?, ?);";
        // Execute database query
        database.query(query, data, (err: MysqlError, result: any) => {
            if (err || result === null) {
                // Send response
                res.status(400).send({
                    message: 'Es ist ein Fehler beim Erstellen des Nuters aufgetreten' + err ,
                });
            } else {
                res.status(201).send({
                    message: 'Nutzer wurde erfolgreich erstellt',
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'Es wurden nicht alle Felder gefüllt.',
        });
    }
});


