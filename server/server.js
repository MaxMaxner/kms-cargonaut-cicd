"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var user_1 = require("../frontend/src/models/user");
var config_1 = require("./config/config");
var mysql = require("./node_modules/mysql");
var cryptoJS = require("./node_modules/crypto-js");
var session = require("./node_modules/express-session");
var router = express();
var database = mysql.createConnection(config_1.Configuration.mysqlOptions);

const allowCrossDomain = (req, res, next)=>{
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `*`);
    res.header(`Access-Control-Allow-Headers`, `*`);
    next();
}

router.use(allowCrossDomain)

router.use(bodyParser.json());
router.use(session(config_1.Configuration.sessionOptions));
/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
router.use('/', express.static("".concat(__dirname, "/../frontend/dist/frontend")));
router.use('/*', express.static("".concat(__dirname, "/../frontend/dist/frontend")));
var server = router.listen(8080, 'localhost', function () {
    console.log('');
    console.log('-------------------------------------------------------------');
    console.log('       Frontend aufrufen: http://localhost:8080              ');
    console.log('-------------------------------------------------------------');
});
/*****************************************************************************
 * CONNECTION DB                                                             *
 *****************************************************************************/
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
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
    var query = 'SELECT * FROM Benutzer WHERE mail = ? AND password = ?;';
    return function (req, res, next) {
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        }
        else {
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
router.get('/login', loginCheck(), function (req, res) {
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
router.post('/login', function (req, res) {
    // Read data from request
    var mail = req.body.mail;
    var password = req.body.password;
    // Create database query and data
    var data = [mail, cryptoJS.SHA512(password).toString()];
    var query = 'SELECT * FROM user WHERE mail = ? AND password = ?;';
    // request user from database
    database.query(query, data, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        }
        else {
            // Check if database response contains exactly one entry
            if (rows.length === 1) {
                // Login data is correct, user is logged in
                var user = (rows[0].mail,
                    rows[0].firstname,
                    rows[0].lastname,
                    String(new Date(rows[0].time)));
                req.session.user = user; // Store user object in session for authentication
                res.status(200).send({
                    message: 'Erfolgreich eingeloggt',
                    user: user,
                });
            }
            else {
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
router.post('/logout', function (req, res) {
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
router.post('/user', function (req, res) {
    // Read data from request body
    var mail = req.body.mail;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = cryptoJS.SHA512(req.body.password).toString();
    var birthday = req.body.birthday;
    var mobilephone = req.body.mobilephone;
    var photo = req.body.photo;
    var licence = req.body.licence;
    var smocker = req.body.smocker;
    //Birthday in "YYY-MM-DD"
    var year = new Date(birthday).getFullYear();
    var month = new Date(birthday).getMonth() + 1;
    var day = new Date(birthday).getDate();
    var formattedDate = "".concat(year, "-").concat(month.toString().padStart(2, '0'), "-").concat(day.toString().padStart(2, '0'));
    // add a new user if names, email- and password exist
    if (firstname && lastname && mail && password) {
        // Create new user
        // Create database query and data
        var today = new Date();
        var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (new Date(birthday) <= eighteenYearsAgo) {
            var data = new user_1.User(mail, firstname, lastname, password, formattedDate, mobilephone, photo, licence, smocker); // As standard, any new user
            var query = "INSERT INTO `user` (`mail`, `firstname`, `lastname`, `password`, `birthday`, `mobilephone`, `photo`, `licence`, `smocker`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            console.log(data);
            // Execute database query
            database.query(query, [mail, firstname, lastname, password, formattedDate, mobilephone, photo, licence, smocker], function (err, result) {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: 'E-Mail-Adresse ' + mail + ' bereits vergeben.',
                    });
                }
                else if (!err) {
                    res.status(201).send({
                        message: 'Nutzer wurde erfolgreich erstellt',
                    });
                }
                else {
                    res.status(500).send({
                        message: 'DB-Error: ' + err,
                    });
                }
            });
        }
        else {
            res.status(400).send({
                message: 'Für die Registration ist das Mindestalter von 18 Jahren erforderlich. '
            });
        }
    }
    else {
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
router.get('/user/:mail', loginCheck, function (req, res) {
    // Read data from request parameters
    var mail = req.params.mail;
    var query = 'SELECT * FROM user WHERE mail = ?;';
    database.query(query, mail, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        }
        else if (rows.length === 1) {
            var user = new user_1.User(rows[0].mail, rows[0].firstname, rows[0].lastname, null, null, null, rows[0].photo, null, rows[0].smocker);
            res.status(200).send({
                user: user,
                message: 'Nutzerdaten erfolgreich übertragen.',
            });
        }
        else {
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
router.put('/user/:mail', function (req, res) {
    // Read data from request
    var mail = req.params.mail;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var birthday = req.body.birthday;
    var mobilephone = req.body.mobilephone;
    var photo = req.body.photo;
    var licence = req.body.licence;
    var smocker = req.body.smocker;
    // Check that all arguments are given
    //Birthday in "YYY-MM-DD"
    var year = new Date(birthday).getFullYear();
    var month = new Date(birthday).getMonth() + 1;
    var day = new Date(birthday).getDate();
    var formattedDate = "".concat(year, "-").concat(month.toString().padStart(2, '0'), "-").concat(day.toString().padStart(2, '0'));
    // add a new user if names, email- and password exist
    if (firstname && lastname && mail) {
        // Create new user
        // Create database query and data
        var today = new Date();
        var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (new Date(birthday) <= eighteenYearsAgo) {
            var data = [mail, firstname, lastname, formattedDate, mobilephone, licence, smocker]; // As standard, any new user
            var query = "UPDATE `user` SET  `firstname`= ?, `lastname`= ?, `birthday`= ?, `mobilephone`= ?,  `licence`= ?, `smocker`= ? WHERE mail =? ";
            console.log(data);
            // Execute database query
            database.query(query, [mail, firstname, lastname, formattedDate, mobilephone, licence, smocker], function (err, result) {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: 'E-Mail-Adresse ' + mail + ' bereits vergeben.',
                    });
                }
                else if (!err) {
                    res.status(201).send({
                        message: 'Nutzerdaten wurden erfolgreich geändert.',
                    });
                }
                else {
                    res.status(500).send({
                        message: 'DB-Error: ' + err,
                    });
                }
            });
        }
        else {
            res.status(400).send({
                message: 'Für die Registration ist das Mindestalter von 18 Jahren erforderlich. '
            });
        }
    }
    else {
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
router.put('/userpassword/:mail', function (req, res) {
    // Read data from request
    var mail = req.params.mail;
    var passwordNew = req.body.passwordNew;
    var passwordNew1 = req.body.passwordNew1;
    // Check that all arguments are given
    // add a new user if names, email- and password exist
    // Create new user
    // Create database query and data
    if (passwordNew1 == passwordNew) {
        var query = "UPDATE `user` SET  `password`= ? WHERE mail =? ";
        // Execute database query
        database.query(query, [mail, cryptoJS.SHA512(passwordNew1).toString()], function (err, result) {
            if (err || result === null) {
                // Send response
                res.status(400).send({
                    message: 'Es ist ein Fehler unterlaufen.',
                });
            }
            else if (!err) {
                res.status(201).send({
                    message: 'Passwort wurden erfolgreich geändert.',
                });
            }
            else {
                res.status(500).send({
                    message: 'DB-Error: ' + err,
                });
            }
        });
    }
    else {
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
router.delete('/user/:mail', loginCheck(), function (req, res) {
    // Read data from request
    var mail = req.params.mail;
    var query = 'DELETE FROM user WHERE mail = ?;';
    database.query(query, mail, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'Database request failed: ' + err,
            });
        }
        else {
            if (rows.affectedRows === 1) {
                res.status(200).send({
                    message: "Nutzer erfolgreich gel\u00F6scht.",
                });
            }
            else {
                res.status(400).send({
                    message: 'Der zu löschende Nutzer wurde nicht gefunden.',
                });
            }
        }
    });
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
router.get('/users', loginCheck(), function (req, res) {
    var query = 'SELECT * FROM user;';
    database.query(query, query, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: 'DB-Error: ' + err,
            });
        }
        else {
            // Create local user list to parse users from database
            var userList = [];
            // Parse every entry
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                userList.push(new user_1.User(rows[0].mail, rows[0].firstname, rows[0].lastname, null, rows[0].birthday, rows[0].mobilephone, rows[0].photo, rows[0].licence, rows[0].smocker));
            }
            // Send user list to clientdir
            res.status(200).send({
                userList: userList,
                message: 'Daten erfolgreich übermittelt.'
            });
        }
    });
});
