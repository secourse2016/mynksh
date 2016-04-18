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
                // mongo.seed('bookings', bookings, function() {
                    mongo.seed('airports', airports, function() {
                        mongo.close();
                    });
                // });
            });
        });

    });
};

var c =exports.clearDB = function(cb) {
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
        collection.find().toArray(function(err, airports) {
            cb(err, airports);
            mongo.close();
        });
    });
}

exports.getBooking = function(cb) {
    mongo.connect(function(err, db) {
        var collection = db.collection('bookings');
        collection.find().toArray(function(err, bookings) {
            cb(err, bookings);
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
            "departureTime": {
                '$regex': departingDate
            }

        }).toArray(function(err, flights) {
            if (flights[0] == undefined) {
                cb(err, []);
            } else {
                if (economyOrBusiness == "economy") {
                    cost = flights[0].eCost;
                } else {
                    cost = flights[0].bCost;
                }

                if ((economyOrBusiness == "economy" && flights[0].availableESeats > 0) || (economyOrBusiness == "business" && flights[0].availableBSeats > 0)) {
                    var departureDate = flights[0].departureTime;
                    var ArrivalDate = flights[0].arrivalTime;
                    rflights = [{
                        "flightNumber": flights[0].flightNumber,
                        "aircraftType": flights[0].aircraftType,
                        "aircraftModel": flights[0].aircraftModel,
                        "departureDateTime": moment(departureDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
                        "arrivalDateTime": moment(ArrivalDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
                        "cost": cost,
                        "currency": "EUR",
                        "origin": origin,
                        "destination": flights[0].destination,
                        "class": economyOrBusiness,
                        "Airline": "IBERIA",

                    }];
                } else
                    rflights = {};
                cb(err, rflights);
            }
            mongo.close();

        });
    });
}

exports.submitPay = function(firstName, lastName, passport, passportNumber, issueDate, expiryDate, email, phoneNumber, bookingRefNumber, flightNumber, cb) {

    console.log('i`m in api');
    mongo.connect(function(err, db) {

        // var cursor =db.collection('flights').find( );
        //    cursor.each(function(err, doc) {
        //       if (doc != null) {
        //          console.dir(doc);
        //       }
        //    });
        // update after find free seat


        var collection = db.collection('flights');
        collection.find({
            "flightNumber": flightNumber
        }).toArray(function(err, flights) {
            if (flights.length === 0) {
                cb(err, false);
                mongo.close();
                return;
            }
            //flights[0].seat[flights[0].nextvf,m]

            db.collection.update({
                "SeatMap": seatMap[flights[0].next]
            }, {
                "bookingRefNumber": bookingRefNumber
            }, {
                upsert: false
            });

            var collection = db.collection('bookings');
            var document = {
                "firstName": firstName,
                "lastName": lastName,
                "passport": passport,
                "passportNumber": passportNumber,
                "issueDate": issueDate,
                "expiryDate": expiryDate,
                "email": email,
                "phoneNumber": phoneNumber,
                "bookingRefNumber": bookingRefNumber,
                "flightNumber": flightNumber
            };
            collection.insertOne(document, {
                w: 1
            }, function(err, records) {
                mongo.close();
                cb(err, true);
            });

        });
    });
}
