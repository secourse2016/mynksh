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
                    mongo.seed('bookings', bookings, function() {
                        mongo.close();
                    });
                });
            });
        });

    });
};
