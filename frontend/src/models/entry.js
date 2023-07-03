"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
var Entry = /** @class */ (function () {
    function Entry(entryID, usermail, entrytype, startlocation, destination, stops, seats, maxtranspweight, price, startdate, starttime) {
        this.usermail = usermail;
        this.entrytype = entrytype;
        this.startlocation = startlocation;
        this.destination = destination;
        this.stops = stops;
        this.seats = seats;
        this.maxtranspweight = maxtranspweight;
        this.price = price;
        this.startdate = startdate;
        this.starttime = starttime;
    }
    Entry.prototype.getUsermail = function () {
        return this.usermail;
    };
    return Entry;
}());
exports.Entry = Entry;
