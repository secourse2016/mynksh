var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/mynksh';
var flights = require('../modules/flights.json');
var assert = require('assert');

//will remove every thing in the database then  seed post to the database

var db = exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.close = function() {
    DB.close();
};

exports.seed = function(post,cb) {
      DB.clearDB(function(err) {
          assert.equal(null, err);
          DB.db().collection('flights').insert(post, function(err, result) {
              assert.equal(null, err);
              cb(err);
          });
      });
  };

var connect = exports.connect = function(cb) {
    mongo.connect(dbURL, function(err, db) {
        DB = db;
        console.log("connected to db successfully!");
        cb(err, db);
    });
};

var clearDB = exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function(collections) {
        collections.forEach(function(c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};
