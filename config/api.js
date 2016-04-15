var mongo = require('./db.js');
var flights = require('../modules/flights.json');
var airports = require('../modules/airports.json');
var bookings = require('../modules/bookings.json');
var assert = require('assert');

var seedDB = exports.seedDB = function(cb) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
    mongo.connect(function(err, mdb) {
        mongo.clearDB(function(err) {
            assert.equal(null, err);
            mongo.seed('flights', flights, function() {
                mongo.seed('airports', airports, function() {
                    mongo.seed('bookings', bookings, function() {
                        mongo.close();
                    });
                });
            });
            // mongo.seed("airports", flights);
            // mongo.seed("bookings", flights);
            // cb(err,true);
        });

    });
};

seedDB();
