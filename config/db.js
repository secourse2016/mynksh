//will remove every thing in the database then  seed post to the database

(function() {
    var client = require('mongodb').MongoClient;
    var db;
    module.exports = {
        init: function(dbURL, callback) {
            client.connect(dbURL, function(err, database) {
                if (err) console.log("[error] mongo connection: ", err);
                else console.log("connected to db successfully!");
                db = database;
                if (callback) callback();
            });
        },
        db: function() {
            if (db === null) throw Error('DB Object has not yet been initialized');
            return db;
        },
        close: function() {
            db.close();
        },
        seed: function(collectionName, post, cb) {
            db.collection(collectionName).insert(post, {w: 1}, function(err, result) {
                // assert.equal(null, err);
                console.log("Seeding done for collection : " + collectionName);
                cb();
            });
        },
        clearDB: function(done) {
            db.listCollections().toArray().then(function(collections) {
                collections.forEach(function(c) {
                    db.collection(c.name).removeMany();
                });
                done();
            }).catch(done);
        }
    };

})();
