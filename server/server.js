"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var user_1 = require("../frontend/src/models/user");
var entry_1 = require("../frontend/src/models/entry");
var car_1 = require("../frontend/src/models/car");
var config_1 = require("./config/config");
var mysql = require("./node_modules/mysql");
var cryptoJS = require("./node_modules/crypto-js");
var session = require("./node_modules/express-session");
var router = express();
var database = mysql.createConnection(config_1.Configuration.mysqlOptions);
router.use(bodyParser.json());
router.use(session(config_1.Configuration.sessionOptions));
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};
router.use(allowCrossDomain);
/*****************************************************************************
 * STATIC ROUTES                                                             *
 *****************************************************************************/
router.use("/", express.static("".concat(__dirname, "/../frontend/dist/frontend")));
router.use("/*", express.static("".concat(__dirname, "/../frontend/dist/frontend")));
var server = router.listen(8080, "localhost", function () {
    console.log("");
    console.log("-------------------------------------------------------------");
    console.log("       Frontend aufrufen: http://localhost:8080              ");
    console.log("-------------------------------------------------------------");
});
/*****************************************************************************
 * CONNECTION DB                                                             *
 *****************************************************************************/
database.connect(function (err) {
    if (err) {
        console.log("Database connection failed: ", err);
    }
    else {
        console.log("Database is connected");
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
    var query = "SELECT * FROM Benutzer WHERE mail = ? AND password = ?;";
    return function (req, res, next) {
        if (req.session.user) {
            // User has an active session and is logged in, continue with route
            next();
        }
        else {
            // User is not logged in
            res.status(401).send({
                message: "Nicht eingeloggt",
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
router.get("/login", loginCheck(), function (req, res) {
    // @ts-ignore
    // @ts-ignore
    res.status(200).send({
        message: "User still logged in",
        user: req.session.id, // Send user object to client for greeting message
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
router.post("/login", function (req, res) {
    // Read data from request
    var mail = req.body.mail;
    var password = req.body.password;
    // Create database query and data
    var data = [mail, cryptoJS.SHA512(password).toString()];
    var query = "SELECT * FROM user WHERE mail = ? AND password = ?;";
    // request user from database
    database.query(query, data, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: "Database request failed: " + err,
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
                    message: "Erfolgreich eingeloggt",
                    user: user,
                });
            }
            else {
                // Login data is incorrect, user is not logged in
                res.status(401).send({
                    message: "E-Mail oder Password ist nicht korrekt.",
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
router.post("/logout", function (req, res) {
    // Log out user
    // @ts-ignore
    delete req.session.user; // Delete user from session
    res.status(200).send({
        message: "Erfolgreich ausgeloggt",
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
router.post("/user", function (req, res) {
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
    var language = req.body.language;
    var year = new Date(birthday).getFullYear();
    var month = new Date(birthday).getMonth() + 1;
    var day = new Date(birthday).getDate();
    var formattedDate = "".concat(year, "-").concat(month
        .toString()
        .padStart(2, "0"), "-").concat(day.toString().padStart(2, "0"));
    // add a new user if names, email- and password exist
    if (firstname && lastname && mail && password) {
        // Create new user
        // Create database query and data
        var today = new Date();
        var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (new Date(birthday) <= eighteenYearsAgo) {
            var data = new user_1.User(mail, firstname, lastname, password, formattedDate, mobilephone, photo, licence, smocker, language); // As standard, any new user
            var query = "INSERT INTO `user` (`mail`, `firstname`, `lastname`, `password`, `birthday`, `mobilephone`, `photo`, `licence`, `smocker`,`language`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
            console.log(data);
            // Execute database query
            database.query(query, [
                mail,
                firstname,
                lastname,
                password,
                formattedDate,
                mobilephone,
                photo,
                licence,
                smocker,
                language,
            ], function (err, result) {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: "E-Mail-Adresse " + mail + " bereits vergeben.",
                    });
                }
                else if (!err) {
                    res.status(201).send({
                        message: "Nutzer wurde erfolgreich erstellt",
                    });
                }
                else {
                    res.status(500).send({
                        message: "DB-Error: " + err,
                    });
                }
            });
        }
        else {
            res.status(400).send({
                message: "Für die Registration ist das Mindestalter von 18 Jahren erforderlich. ",
            });
        }
    }
    else {
        res.status(400).send({
            message: "Es wurden nicht alle Felder gefüllt.",
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
router.get("/user/:mail", function (req, res) {
    // Read data from request parameters
    var mail = req.params.mail;
    var query = "SELECT * FROM user WHERE mail = ?;";
    database.query(query, mail, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: "Database request failed: " + err,
            });
        }
        else if (rows.length === 1) {
            var user = new user_1.User(rows[0].mail, rows[0].firstname, rows[0].lastname, null, rows[0].birthday, rows[0].mobilephone, rows[0].photo, rows[0].licence, rows[0].smocker, rows[0].language);
            res.status(200).send({
                user: user,
                message: "Nutzerdaten erfolgreich übertragen.",
            });
        }
        else {
            res.status(404).send({
                message: "Etwas ist schief gelaufen.",
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
router.put("/user/:mail", function (req, res) {
    // Read data from request
    var mail = req.params.mail;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var birthday = req.body.birthday;
    var mobilephone = req.body.mobilephone;
    var photo = req.body.photo;
    var licence = req.body.licence;
    var smocker = req.body.smocker;
    var language = req.body.language;
    // Check that all arguments are given
    //Birthday in "YYY-MM-DD"
    var year = new Date(birthday).getFullYear();
    var month = new Date(birthday).getMonth() + 1;
    var day = new Date(birthday).getDate();
    var formattedDate = "".concat(year, "-").concat(month
        .toString()
        .padStart(2, "0"), "-").concat(day.toString().padStart(2, "0"));
    // add a new user if names, email- and password exist
    if (firstname && lastname && mail) {
        // Create new user
        // Create database query and data
        var today = new Date();
        var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (new Date(birthday) <= eighteenYearsAgo) {
            var data = [
                firstname,
                lastname,
                formattedDate,
                mobilephone,
                licence,
                smocker,
                language,
                mail,
            ]; // As standard, any new user
            var query = "UPDATE `user` SET  `firstname`= ?, `lastname`= ?, `birthday`= ?, `mobilephone`= ?,  `licence`= ?, `smocker`= ?,`language`= ? WHERE mail =? ";
            console.log(data);
            // Execute database query
            database.query(query, data, function (err, result) {
                if (err || result === null) {
                    // Send response
                    res.status(400).send({
                        message: "E-Mail-Adresse " + mail + " bereits vergeben.",
                    });
                }
                else if (!err) {
                    res.status(201).send({
                        message: "Nutzerdaten wurden erfolgreich geändert.",
                    });
                }
                else {
                    res.status(500).send({
                        message: "DB-Error: " + err,
                    });
                }
            });
        }
        else {
            res.status(400).send({
                message: "Für die Registration ist das Mindestalter von 18 Jahren erforderlich. ",
            });
        }
    }
    else {
        res.status(400).send({
            message: "Es müssen die Felder E-Mail, Vorname und Nachname gefüllt sein.",
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
router.put("/userpassword/:mail", function (req, res) {
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
                    message: "Es ist ein Fehler unterlaufen.",
                });
            }
            else if (!err) {
                res.status(201).send({
                    message: "Passwort wurden erfolgreich geändert.",
                });
            }
            else {
                res.status(500).send({
                    message: "DB-Error: " + err,
                });
            }
        });
    }
    else {
        res.status(400).send({
            message: "Die beiden neuen passwörter stimmen nicht überein.",
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
router.delete("/user/:mail", loginCheck(), function (req, res) {
    // Read data from request
    var mail = req.params.mail;
    var query = "DELETE FROM user WHERE mail = ?;";
    database.query(query, mail, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: "Database request failed: " + err,
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
                    message: "Der zu löschende Nutzer wurde nicht gefunden.",
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
router.get("/users", loginCheck(), function (req, res) {
    var query = "SELECT * FROM user;";
    database.query(query, query, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: "DB-Error: " + err,
            });
        }
        else {
            // Create local user list to parse users from database
            var userList = [];
            // Parse every entry
            for (var _a = 0, rows_2 = rows; _a < rows_2.length; _a++) {
                var row = rows_2[_a];
                userList.push(new user_1.User(rows[0].mail, rows[0].firstname, rows[0].lastname, null, rows[0].birthday, rows[0].mobilephone, rows[0].photo, rows[0].licence, rows[0].smocker, rows[0].language));
            }
            // Send user list to clientdir
            res.status(200).send({
                userList: userList,
                message: "Daten erfolgreich übermittelt.",
            });
        }
    });
});
//For get all entries
router.get("/entries", loginCheck(), function (req, res) {
    var query = "SELECT * FROM entries WHERE entrytype = offer;";
    database.query(query, query, function (err, rows) {
        if (err) {
            // Login data is incorrect, user is not logged in
            res.status(500).send({
                message: "DB-Error: " + err,
            });
        }
        else {
            // Create local user list to parse users from database
            var entryList = [];
            // Parse every entry
            for (var _a = 0, rows_3 = rows; _a < rows_3.length; _a++) {
                var row = rows_3[_a];
                entryList.push(new entry_1.Entry(rows[0].entryID, rows[0].usermail, rows[0].entrytype, null, rows[0].destination, rows[0].stops, rows[0].seats, rows[0].maxtranspweight, rows[0].price, rows[0].startdate, rows[0].starttime));
            }
            // Send user list to clientdir
            res.status(200).send({
                entryList: enrtyList,
                message: "Daten erfolgreich übermittelt.",
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
router.post("/offerOne", function (req, res) {
    // Access the form data sent from the client
    var formData = req.body;
    // Perform any necessary server-side validation or processing
    var requiredFields = [
        "datum",
        "sonstigeinfo",
        "von",
        "nach",
        "handynummer",
    ];
    var missingFields = requiredFields.filter(function (field) { return !(field in formData); });
    if (missingFields.length > 0) {
        return res.status(400).json({ message: "Invalid data provided" });
    }
    // Save the offer data to the database
    var query = "INSERT INTO offers (datum, time, von, nach, zwischenziel, handynummer) VALUES (?, ?, ?, ?, ?, ?)";
    var values = [
        formData.datum,
        formData.time,
        formData.von,
        formData.nach,
        formData.zwischenziel || null,
        formData.handynummer,
    ];
    database.query(query, values, function (err, result) {
        if (err) {
            // Handle database error
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        // Offer created successfully
        return res.status(200).json({ message: "Offer created successfully" });
    });
});
router.post("/car", function (req, res) {
    var nrplate = req.body.nrplate;
    var usermail = req.body.usermail;
    var brand = req.body.brand;
    var model = req.body.model;
    var maximalloadheight = req.body.maximalloadheight;
    var maximalloadwidth = req.body.maximalloadwidth;
    var weight = req.body.weight;
    var maximalloadweight = req.body.maximalloadweight;
    var type = req.body.type;
    var features = req.body.features;
    if (nrplate && usermail && brand && model) {
        var data = new car_1.Car(nrplate, usermail, brand, model, maximalloadheight, maximalloadwidth, weight, maximalloadweight, type, features);
        var query = "INSERT INTO `car` (`nrplate`, `usermail`, `brand`, `model`, `maximalloadheight`, `maximalloadwidth`, `weight`, `maximalloadweight`, `type`, `features`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        console.log(data);
        database.query(query, [
            nrplate,
            usermail,
            brand,
            model,
            maximalloadheight,
            maximalloadwidth,
            weight,
            maximalloadweight,
            type,
            features,
        ], function (err, rows) {
            if (err || rows === null) {
                res.status(400).send({
                    message: "Auto mit dem Nummernschild " + nrplate + " bereits registriert.",
                });
            }
            else if (!err) {
                res.status(201).send({
                    message: "Auto wurde erfolgreich registriert",
                });
            }
            else {
                res.status(500).send({
                    message: "DB-Error: " + err,
                });
            }
        });
    }
    else {
        res.status(400).send({
            message: "Es wurden nicht alle Felder gefüllt.",
        });
    }
});
router.get("/car/:mail", function (req, res) {
    var mail = req.params.mail;
    var query = "SELECT * FROM car WHERE usermail = ?;";
    database.query(query, mail, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: "Database request failed: " + err,
            });
        }
        else if (rows.length === 1) {
            var car = new car_1.Car(rows[0].nrplate, rows[0].usermail, rows[0].brand, rows[0].model, rows[0].maximalloadheight, rows[0].maximalloadwidth, rows[0].weight, rows[0].maximalloadweight, rows[0].type, rows[0].features);
            res.status(200).send({
                car: car,
                message: "Autodaten erfolgreich übertragen.",
            });
        }
        else {
            res.status(404).send({
                message: "Etwas ist schief gelaufen.",
            });
        }
    });
});
router.put("/car/:mail", function (req, res) {
    var nrplate = req.body.nrplate;
    var usermail = req.params.mail;
    var brand = req.body.brand;
    var model = req.body.model;
    var maximalloadheight = req.body.maximalloadheight;
    var maximalloadwidth = req.body.maximalloadwidth;
    var weight = req.body.weight;
    var maximalloadweight = req.body.maximalloadweight;
    var type = req.body.type;
    var features = req.body.features;
    if (nrplate && usermail) {
        var data = [
            brand,
            model,
            maximalloadheight,
            maximalloadwidth,
            weight,
            maximalloadweight,
            type,
            features,
            usermail,
        ];
        var query = "UPDATE `car` SET  `brand`= ?, `model`= ?, `maximalloadheight`= ?,  `maximalloadwidth`= ?, `weight`= ?, `maximalloadweight`= ?, `type`= ?, `features`= ? WHERE usermail =? ";
        console.log(data);
        database.query(query, data, function (err, result) {
            if (err || result === null) {
                res.status(400).send({
                    message: "Auto mit dem Nummernschild " + nrplate + " bereits registriert.",
                });
            }
            else if (!err) {
                res.status(201).send({
                    message: "Autodaten wurden erfolgreich geändert.",
                });
            }
            else {
                res.status(500).send({
                    message: "DB-Error: " + err,
                });
            }
        });
    }
    else {
        res.status(400).send({
            message: "Es müssen die Felder E-Mail und Nummernschild gefüllt sein.",
        });
    }
});
router.delete("/car/:nrplate", loginCheck, function (req, res) {
    var nrplate = req.params["nrplate"];
    var query = "DELETE FROM car WHERE nrplate = ?;";
    database.query(query, nrplate, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: "Database request failed: " + err,
            });
        }
        else {
            if (rows.affectedRows === 1) {
                res.status(200).send({
                    message: "Auto erfolgreich gel\u00F6scht.",
                });
            }
            else {
                res.status(400).send({
                    message: "Das zu löschende Auto wurde nicht gefunden.",
                });
            }
        }
    });
});
router.get("/cars", loginCheck, function (req, res) {
    var query = "SELECT * FROM car;";
    database.query(query, query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: "DB-Error: " + err,
            });
        }
        else {
            var carList = [];
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                carList.push(new car_1.Car(rows[0].nrplate, rows[0].usermail, rows[0].brand, rows[0].model, rows[0].maximalloadheight, rows[0].maximalloadwidth, rows[0].weight, rows[0].maximalloadweight, rows[0].type, rows[0].features));
            }
            res.status(200).send({
                carList: carList,
                message: "Daten erfolgreich übermittelt.",
            });
        }
    });
});
