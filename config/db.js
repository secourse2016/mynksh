var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/mynksh';
var assert=require('assert');
//will remove every thing in the database then  seed post to the database

var db = exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.close = function() {
    DB.close();
};

exports.seed = function(collectionName,post,cb) {
          db().collection(collectionName).insert(post, {w:1},function(err, result) {
              // assert.equal(null, err);
              console.log("Seeding done for collection : " + collectionName);
              cb();
          });
};

exports.connect = function(cb) {
    mongo.connect(dbURL, function(err, db) {
      if (err) console.log("[error] mongo connection: ", err);
        DB = db;
        console.log("connected to db successfully!");
        cb(err, db);
    });
};

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function(collections) {
        collections.forEach(function(c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};
