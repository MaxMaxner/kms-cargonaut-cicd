import express = require ('express');
import bodyParser = require ('body-parser');
import {Request, Response} from 'express';
import {User} from '../frontend/src/models/user';
import{Entry} from '../frontend/src/models/entry';
import {Configuration} from './config/config';
import {Connection, MysqlError} from "./node_modules/mysql";
import mysql = require ("./node_modules/mysql");
import cryptoJS = require ("./node_modules/crypto-js");
import session = require ('./node_modules/express-session');
import {Session} from "express-session";

const router = express();

const database: Connection = mysql.createConnection(Configuration.mysqlOptions);
router.use(bodyParser.json());
router.use(session(Configuration.sessionOptions));


/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
router.use('/', express.static("".concat(__dirname, "/../frontend/dist/frontend")));
router.use('/*', express.static("".concat(__dirname, "/../frontend/dist/frontend")));
let server = router.listen(8080, 'localhost', function () {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('       Frontend aufrufen: http://localhost:8080              ');
    console.log('-------------------------------------------------------------');
});


/*****************************************************************************
 * CONNECTION DB                                                             *
 *****************************************************************************/
database.connect((err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});


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
    // Create database query and data
    const query: string = 'SELECT * FROM Benutzer WHERE mail = ? AND password = ?;';


    return (req: Request, res: Response, next) => {

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
 *         "mail":1,
 *         "firstname":"Admin",
 *         "lastname":"Admin",
 *         "password": "admin@webmail.com"
 *         "Logiontime":"2017-11-12T09:33:25.000Z",
 *     },
 *      "message":"Nutzer ist eingeloggt.",
 *      "user" : "Userdata"
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
        user: req.session.id // Send user object to client for greeting message
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
 *        "user":{
 *         "mail":1,
 *         "firstname":"Admin",
 *         "lastname":"Admin",
 *         "password": "admin@webmail.com"
 *         "Logiontime":"2017-11-12T09:33:25.000Z",
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
 *     "message":"Mail oder Passwort ist nicht korrekt."
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
    const mail: string = req.body.mail;
    const password: string = req.body.password;

    // Create database query and data
    const data: [string, string] = [mail, cryptoJS.SHA512(password).toString()];
    const query: string = 'SELECT * FROM user WHERE mail = ? AND password = ?;';

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

                const user = (rows[0].mail,
                    rows[0].firstname,
                    rows[0].lastname,
                    String(new Date(rows[0].time)));
                req.session.user = user // Store user object in session for authentication
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
 * @apiParam {string} firstname - first name name of the user
 * @apiParam {string} lastname Last name of the user
 * @apiParam {string} mail -  mailadress ..
 * @apiParam {string} password -  password ..
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
    const mail: string = req.body.mail
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const password: string = cryptoJS.SHA512(req.body.password).toString();
    const birthday: string = req.body.birthday;
    const mobilephone: string = req.body.mobilephone;
    const photo: string = req.body.photo
    const licence = req.body.licence
    const smocker = req.body.smocker


    const year: number = new Date(birthday).getFullYear();
    const month: number = new Date(birthday).getMonth() + 1;
    const day: number = new Date(birthday).getDate();
    const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // add a new user if names, email- and password exist
    if (firstname && lastname && mail && password) {
        // Create new user
        // Create database query and data
        const today: Date = new Date();
        const eighteenYearsAgo: Date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (new Date(birthday) <= eighteenYearsAgo) {
            const data: User = new User(mail, firstname, lastname, password, formattedDate, mobilephone, photo, licence, smocker); // As standard, any new user
            const query: string = "INSERT INTO `user` (`mail`, `firstname`, `lastname`, `password`, `birthday`, `mobilephone`, `photo`, `licence`, `smocker`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            console.log(data)
            // Execute database query
            database.query(query, [mail, firstname, lastname, password, formattedDate, mobilephone, photo, licence, smocker], (err: MysqlError, result: any) => {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: 'E-Mail-Adresse ' + mail + ' bereits vergeben.',
                    });
                } else if (!err) {
                    res.status(201).send({
                        message: 'Nutzer wurde erfolgreich erstellt',

                    });
                } else {
                    res.status(500).send({
                        message: 'DB-Error: ' + err,
                    });
                }
            });
        } else {
            res.status(400).send({
                message: 'Für die Registration ist das Mindestalter von 18 Jahren erforderlich. '
            });
        }
    } else {
        res.status(400).send({
            message: 'Es wurden nicht alle Felder gefüllt.'
        });
    }
});


/**
 * @api {get} /user:mail Get user with given mail-adress
 * @apiName getUser
 * @apiGroup User
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 *
 * @apiParam {string} mail The id of the requested user
 *
 * @apiSuccess {User} user The requested user object
 * @apiSuccess {string} message Message stating the user has been found
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 *  @apiError (Client Error) {404} NotFound The requested user can not be found
 *
 * @apiErrorExample NotFound:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "Passwort wurden erfolgreich geändert."
 * }
 */
router.get('/user/:mail', loginCheck, (req: Request, res: Response) => {
    // Read data from request parameters
    const mail: string = req.params.mail
    const query: string = 'SELECT * FROM user WHERE mail = ?;';
    database.query(query, mail, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });

        } else if (rows.length === 1) {
            let user: User = new User(
                rows[0].mail,
                rows[0].firstname,
                rows[0].lastname,
                null,
                null,
                null,
                rows[0].photo,
                null,
                rows[0].smocker,
            );
            res.status(200).send({
                user,
                message: 'Nutzerdaten erfolgreich übertragen.',
            });
        } else {
            res.status(404).send({
                message: 'Etwas ist schief gelaufen.',
            });
        }
    });
});
/**
 * @api {put} /user/:userId Update user with given id
 * @apiName putUser
 * @apiGroup User
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 * @apiUse NotAuthorized
 *
 * @apiParam {string} mail The id of the requested user
 * @apiParam {string} firstname The (new) first name of the user
 * @apiParam {string} lastname The (new) last name of the user
 *
 * @apiSuccess {string} message Message stating the user has been updated
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "message":"Nutzerdaten wurden erfolgreich geändert."
 * }
 *
 * @apiError (Client Error) {400} NotAllMandatoryFields The request did not contain all mandatory fields
 * @apiError (Client Error) {404} NotFound The requested user can not be found
 *
 * @apiErrorExample NotAllMandatoryFields:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message":"Es müssen die Felder E-Mail, Vorname und Nachname gefüllt sein."
 * }
 *
 * @apiErrorExample NotFound:
 * HTTP/1.1 404 Not Found
 * {
 *     "message":"Der Nutzer kann nicht gefunden werden"
 * }
 */
router.put('/user/:mail', (req: Request, res: Response) => {
    // Read data from request
    const mail: string = req.params.mail;
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const birthday: string = req.body.birthday;
    const mobilephone: string = req.body.mobilephone;
    const photo: string = req.body.photo
    const licence: string = req.body.licence;
    const smocker: string = req.body.smocker;
    // Check that all arguments are given
    //Birthday in "YYY-MM-DD"

    const year: number = new Date(birthday).getFullYear();
    const month: number = new Date(birthday).getMonth() + 1;
    const day: number = new Date(birthday).getDate();

    const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // add a new user if names, email- and password exist
    if (firstname && lastname && mail) {
        // Create new user
        // Create database query and data
        const today: Date = new Date();
        const eighteenYearsAgo: Date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (new Date(birthday) <= eighteenYearsAgo) {
            const data: string[] = [mail, firstname, lastname, formattedDate, mobilephone, licence, smocker]; // As standard, any new user
            const query: string = "UPDATE `user` SET  `firstname`= ?, `lastname`= ?, `birthday`= ?, `mobilephone`= ?,  `licence`= ?, `smocker`= ? WHERE mail =? ";
            console.log(data)
            // Execute database query
            database.query(query, [mail, firstname, lastname, formattedDate, mobilephone, licence, smocker], (err: MysqlError, result: any) => {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: 'E-Mail-Adresse ' + mail + ' bereits vergeben.',
                    });
                } else if (!err) {

                    res.status(201).send({
                        message: 'Nutzerdaten wurden erfolgreich geändert.',

                    });
                } else {
                    res.status(500).send({
                        message: 'DB-Error: ' + err,
                    });
                }
            });
        } else {
            res.status(400).send({
                message: 'Für die Registration ist das Mindestalter von 18 Jahren erforderlich. '
            });
        }
    } else {
        res.status(400).send({
            message: 'Es müssen die Felder E-Mail, Vorname und Nachname gefüllt sein.'
        });
    }
});

/**
 * @api {put} /user/:userId Update user with given id
 * @apiName putUser
 * @apiGroup User
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 * @apiUse NotAuthorized
 *
 * @apiParam {string} mail The id of the requested user
 * @apiParam {string} firstname The (new) first name of the user
 * @apiParam {string} lastname The (new) last name of the user
 *
 * @apiSuccess {string} message Message stating the user has been updated
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "message":"Nutzerdaten wurden erfolgreich geändert."
 * }
 *
 * @apiError (Client Error) {400} NotAllMandatoryFields The request did not contain all mandatory fields
 * @apiError (Client Error) {404} NotFound The requested user can not be found
 *
 * @apiErrorExample NotAllMandatoryFields:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message":"Es müssen die Felder E-Mail, Vorname und Nachname gefüllt sein."
 * }
 *
 * @apiErrorExample NotFound:
 * HTTP/1.1 404 Not Found
 * {
 *     "message":"Der Nutzer kann nicht gefunden werden"
 * }
 */
router.put('/userpassword/:mail', (req: Request, res: Response) => {
    // Read data from request
    const mail: string = req.params.mail;
    const passwordNew: string = req.body.passwordNew;
    const passwordNew1: string = req.body.passwordNew1;
    // Check that all arguments are given


    // add a new user if names, email- and password exist

    // Create new user
    // Create database query and data


    if (passwordNew1 == passwordNew) {

        const query: string = "UPDATE `user` SET  `password`= ? WHERE mail =? ";
        // Execute database query
        database.query(query, [mail, cryptoJS.SHA512(passwordNew1).toString()], (err: MysqlError, result: any) => {
            if (err || result === null) {
                // Send response
                res.status(400).send({
                    message: 'Es ist ein Fehler unterlaufen.',
                });
            } else if (!err) {

                res.status(201).send({
                    message: 'Passwort wurden erfolgreich geändert.',

                });
            } else {
                res.status(500).send({
                    message: 'DB-Error: ' + err,
                });
            }
        });

    } else {
        res.status(400).send({
            message: 'Die beiden neuen passwörter stimmen nicht überein.'
        });
    }
});


/**
 * @api {delete} /user/:mail Delete user with given id
 * @apiName deleteUser
 * @apiGroup User
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 * @apiUse NotAuthorized
 *
 * @apiParam {string} mail The id of the requested user
 *
 * @apiSuccess {string} message Message stating the user has been updated
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "message": "Nutzer erfolgreich gelöscht."
 * }
 */
router.delete('/user/:mail', loginCheck(), (req: Request, res: Response) => {
    // Read data from request
    const mail: any = req.params.mail;
    let query: string = 'DELETE FROM user WHERE mail = ?;';
    database.query(query, mail, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        } else {
            if (rows.affectedRows === 1) {
                res.status(200).send({
                    message: `Nutzer erfolgreich gelöscht.`,
                });
            } else {
                res.status(400).send({
                    message: 'Der zu löschende Nutzer wurde nicht gefunden.',
                });
            }

        }
    })
});

/**
 * @api {get} /users Get all users
 * @apiName getUsers
 * @apiGroup Users
 * @apiVersion 2.0.0
 *
 * @apiUse SessionExpired
 *
 * @apiSuccess {User[]} userList The list of all users
 * @apiSuccess {string} message Message stating the users have been found
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   {
 *   "userList": [
 *     {
 *       "mail": "buyer@admin.de",
 *       "firstname": "Buyer",
 *       "lastname": "Buyer",
 *       "password": null,
 *       "birthday": "1991-08-23T22:00:00.000Z",
 *       "mobilephone": "349304",
 *       "photo": null,
 *       "licence": null,
 *       "smocker": 0
 *     },
 *   ],
 *   "message": "Successfully requested user list"
 * }
 */
router.get('/users', loginCheck(), (req: Request, res: Response) => {
    let query: string = 'SELECT * FROM user;';

    database.query(query, query, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'DB-Error: ' + err,
            });
        } else {
            // Create local user list to parse users from database
            const userList: User[] = [];
            // Parse every entry
            for (const row of rows) {
                userList.push(new User(
                    rows[0].mail,
                    rows[0].firstname,
                    rows[0].lastname,
                    null,
                    rows[0].birthday,
                    rows[0].mobilephone,
                    rows[0].photo,
                    rows[0].licence,
                    rows[0].smocker
                ));
            }

            // Send user list to clientdir
            res.status(200).send({
                userList: userList,
                message: 'Daten erfolgreich übermittelt.'
            });
        }
    });
});

//For get all entries
router.get('/entries', loginCheck(), (req: Request, res: Response) => {
    let query: string = 'SELECT * FROM entries WHERE entrytype = offer;';

    database.query(query, query, (err: MysqlError, rows: any) => {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'DB-Error: ' + err,
            });
        } else {
            // Create local user list to parse users from database
            const entryList: Entry[] = [];
            // Parse every entry
            for (const row of rows) {
                userList.push(new Entry(
                    rows[0].entryID,
                    rows[0].usermail,
                    rows[0].entrytype,
                    null,
                    rows[0].birthday,
                    rows[0].mobilephone,
                    rows[0].photo,
                    rows[0].licence,
                    rows[0].smocker
                ));
            }

            // Send user list to clientdir
            res.status(200).send({
                userList: userList,
                message: 'Daten erfolgreich übermittelt.'
            });
        }
    });
});

/**
 * @api {post} /offerOne Create an offer
 * @apiName CreateOffer
 * @apiGroup Offer
 * @apiVersion 1.0.0
 *
 * @apiParam {String} datum Date of the offer
 * @apiParam {String} time Time of the offer
 * @apiParam {String} anmerkungen Additional notes for the offer
 * @apiParam {Boolean} musik Whether music is preferred in the offer
 * @apiParam {Boolean} unterhaltung Whether entertainment is preferred in the offer
 * @apiParam {Boolean} mitfahrer Whether additional passengers are allowed
 * @apiParam {String} sonstigeinfo Other information about the offer
 * @apiParam {String} von Starting point of the offer
 * @apiParam {String} nach Destination of the offer
 * @apiParam {String} zwischenziel Intermediate destination of the offer
 * @apiParam {String} handynummer Phone number of the offer creator
 * @apiParam {Boolean} keineTiere Whether pets are not allowed in the offer
 * @apiParam {Boolean} nichtraucher Whether smoking is not allowed in the offer
 *
 * @apiSuccess {String} message Success message stating that the offer was created successfully
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "message": "Offer created successfully"
 * }
 *
 * @apiError (Client Error) {400} InvalidData Error message stating that the provided data is invalid
 *
 * @apiErrorExample InvalidData:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message": "Invalid data provided"
 * }
 */

// Route handler for '/offerOne' POST request
router.post('/offerOne', (req, res) => {
    // Access the form data sent from the client
    const formData = req.body;

    // Perform any necessary server-side validation or processing
    const requiredFields = ['datum', 'sonstigeinfo', 'von', 'nach', 'handynummer'];
    const missingFields = requiredFields.filter(field => !(field in formData));

    if (missingFields.length > 0) {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    // Save the offer data to the database
    const query = `INSERT INTO offers (datum, time, von, nach, zwischenziel, handynummer) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        formData.datum,
        formData.time,
        formData.von,
        formData.nach,
        formData.zwischenziel || null,
        formData.handynummer
    ];

    database.query(query, values, (err, result) => {
        if (err) {
            // Handle database error
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Offer created successfully
        return res.status(200).json({ message: 'Offer created successfully' });
    });
});

