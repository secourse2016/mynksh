var mongo = require('./db.js');
var flights = require('../modules/flights.json');
var assert = require('assert');

var seedDB = exports.seedDB = function(cb) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
    mongo.connect(function(err, mdb) {
        mongo.clearDB(function(err) {
            assert.equal(null, err);
            mongo.seed("flights", flights);
            mongo.close();
            // }
            // cb(err,true);
        });

    });
};

seedDB();
