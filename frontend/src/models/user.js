"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(mail, firstname, lastname, password, birthday, mobilephone, photo, licence, smocker) {
        this.mail = mail;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.birthday = birthday;
        this.mobilephone = mobilephone;
        this.photo = photo;
        this.licence = licence;
        this.smocker = smocker;
    }
    User.prototype.setBirthday = function (birthday) {
        var eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if (birthday <= eighteenYearsAgo) {
            this.birthday = birthday.toISOString().slice(0, 10); // Beispiel: "2023-06-23"
            return this.birthday;
        }
        else {
            throw new Error('Du musst mindestens 18 Jahre alt sein, um diese Aktion ausführen zu dürfen.');
        }
    };
    return User;
}());
exports.User = User;
