var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/quotedb';


    //will remove every thing in the database then  seed post to the database
    exports.seed = function(post,cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insert(post, function(err, result) {
                assert.equal(null, err);
                // assert.equal(1, result.result.n);
                cb(err);
            });
        });
    };

    var connect = exports.connect = function(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            DB = db;
            cb(err, db);
        });
    };

    exports.db = function() {
        assert.notEqual(null, DB);
        return DB;
    };

    exports.clearDB = function(done) {
        DB.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                DB.collection(c.name).removeMany();
            });
            done();
        }).catch(done);
    };