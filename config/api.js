var mongo = require('./db.js');
var flights = require('../modules/flights.json');
var airports = require('../modules/airports.json');
var bookings = require('../modules/bookings.json');
var assert = require('assert');

exports.seedDB = function(cb) {
    mongo.connect(function(err, mdb) {
        mongo.clearDB(function(err) {
            assert.equal(null, err);
            mongo.seed('flights', flights, function() {
                mongo.seed('airports', airports, function() {
                    // mongo.seed('bookings', bookings, function() {
                    mongo.close();
                    // });
                });
            });
        });

    });
};

exports.clearDB = function(cb) {
    mongo.connect(function(err, mdb) {
        mongo.clearDB(function() {
            mongo.seed('airports', airports, function() {
                mongo.clearDB(function() {
                    mongo.close();
                    cb();
                });
            });
        });
    });;
}

exports.searchFlights = function(origin, destination, departingDate, cabin, cb) {
    var cost = 0;
    var economyOrBusiness = cabin.toLowerCase();
    mongo.connect(function(err, db) {
        var collection = db.collection('flights');
        collection.find({
            "origin": origin,
            "destination": destination,
            "arrivalTime": departingDate
        }).toArray(function(err, flights) {
            if (flights.length === 0)
                return;
            if (economyOrBusiness == "economy") {
                cost = flights[0].eCost;
            } else {
                cost = flights[0].bCost;
            }
            if ((economyOrBusiness == "economy" && flights[0].availableESeats > 0) || (economyOrBusiness == "business" && flights[0].availableBSeats > 0)) {
                rflights = {
                    "flightNumber": flights[0].flightNumber,
                    "aircraftType": flights[0].aircraftType,
                    "aircraftModel": flights[0].aircraftModel,
                    "departureDateTime": flights[0].departureTime,
                    "arrivalDateTime": flights[0].arrivalTime,
                    "cost": cost,
                    "currency": "EUR",
                    "origin": origin,
                    "destination": flights[0].destination,
                    "class": economyOrBusiness,
                    "Airline": "IBERIA"
                };
            } else
                rflights = {};
            mongo.close();
            cb(err, rflights);
        });
    });
}
