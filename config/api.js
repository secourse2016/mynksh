var mongo = require('./db.js');
var flights = require('../modules/flights.json');
var airports = require('../modules/airports.json');
var bookings = require('../modules/bookings.json');
var assert = require('assert');
var moment = require('moment');

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

exports.getAirports = function(cb) {
    mongo.connect(function(err, db) {
        var collection = db.collection('airports');
        collection.find().toArray(function(err,airports){
          cb(err,airports);
          mongo.close();
        });
    });
}

exports.getBooking = function(cb) {
    mongo.connect(function(err, db) {
        var collection = db.collection('bookings');
        collection.find().toArray(function(err,bookings){
          cb(err,bookings);
          mongo.close();
        });
    });
}

exports.searchFlights = function(origin, destination, departingDate, cabin, cb) {
    var cost = 0;
    var economyOrBusiness = cabin.toLowerCase();
    mongo.connect(function(err, db) {
        var collection = db.collection('flights');
        var date = new Date(departingDate);
        collection.find({
            "origin": origin,
            "destination": destination,
            "departureTime": {'$regex': departingDate} 

        }).toArray(function(err, flights) {
            if (flights[0] == undefined){
                cb(err,{});
            }
            else{
            if (economyOrBusiness == "economy") {
                cost = flights[0].eCost;
            } else {
                cost = flights[0].bCost;
            }

            if ((economyOrBusiness == "economy" && flights[0].availableESeats > 0) || (economyOrBusiness == "business" && flights[0].availableBSeats > 0)) {
                var departureDate =flights[0].departureTime; 
         		var ArrivalDate   =flights[0].arrivalTime; 
                rflights = [{
                    "flightNumber"     : flights[0].flightNumber,
                    "aircraftType"     : flights[0].aircraftType,
                    "aircraftModel"    : flights[0].aircraftModel,
                    "departureDateTime": moment(departureDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
                    "arrivalDateTime"  : moment(ArrivalDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
                    "cost"             : cost,
                    "currency"		   : "EUR",
                    "origin"		   : origin,
                    "destination"      : flights[0].destination,
                    "class"            : economyOrBusiness,
                    "Airline"          : "IBERIA",

                }];
            } else
                rflights = {};
                cb(err, rflights);
            }
            mongo.close();
            
        });
    });
}
