"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var CarType;
(function (CarType) {
    CarType["PKW"] = "PKW";
    CarType["Transporter"] = "Transporter";
    CarType["LKW"] = "LKW";
})(CarType || (CarType = {}));
var CarFeature;
(function (CarFeature) {
    CarFeature["Klimaanlage"] = "Klimaanlage";
    CarFeature["Heizung"] = "Heizung";
    CarFeature["ElektrischeFensterheber"] = "Elektrische Fensterheber";
    CarFeature["Sportausstattung"] = "Sportausstattung";
    CarFeature["Ladeflaeche"] = "Ladeflaeche";
})(CarFeature || (CarFeature = {}));
var Car = /** @class */ (function () {
    function Car(nrplate, usermail, brand, model, maximalloadheight, maximalloadwidth, weight, maximalloadweight, type, features) {
        this.nrplate = nrplate;
        this.usermail = usermail;
        this.brand = brand;
        this.model = model;
        this.maximalloadheight = maximalloadheight;
        this.maximalloadwidth = maximalloadwidth;
        this.weight = weight;
        this.maximalloadweight = maximalloadweight;
        this.type = type;
        this.features = features;
    }
    Car.prototype.getNrPlate = function () {
        return this.nrplate;
    };
    Car.prototype.getUserMail = function () {
        return this.usermail;
    };
    Car.prototype.setUserMail = function (value) {
        // Validierung der E-Mail-Adresse
        if (this.validateEmail(value)) {
            this.usermail = value;
        }
        else {
            throw new Error('Ungültige E-Mail-Adresse.');
        }
    };
    Car.prototype.getBrand = function () {
        return this.brand;
    };
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.getMaximalLoadHeight = function () {
        return this.maximalloadheight;
    };
    Car.prototype.getMaximalLoadWidth = function () {
        return this.maximalloadwidth;
    };
    Car.prototype.getWeight = function () {
        return this.weight;
    };
    Car.prototype.getMaximalLoadWeight = function () {
        return this.maximalloadweight;
    };
    Car.prototype.getType = function () {
        return this.type;
    };
    Car.prototype.getFeatures = function () {
        return this.features;
    };
    Car.prototype.validateEmail = function (email) {
        // E-Mail-Validierung implementieren (z. B. mit regulären Ausdrücken)
        // Beispiel: Überprüfung auf das Vorhandensein eines @-Symbols
        var emailRegex = /@/;
        return emailRegex.test(email);
    };
    return Car;
}());
exports.Car = Car;
