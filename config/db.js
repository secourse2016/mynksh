var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/mynksh';
var flights= require('../modules/flights.json');
var assert=require('assert');


    //will remove every thing in the database then  seed post to the database
  

   var connect = function(cb) {
    
     mongo.connect(dbURL,function (err,db) 
     {
       
             console.log("Connected to database");
             DB=db;
             cb(err,DB);
     });
     
 };

    var db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

    var close = function(){
        DB.close();
    };

    var clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
    };

   exports.seed = function(cb) { 
    connect(function(err,DB){  
        var collection = DB.collection('flights');
        collection.count({}, function(err, docs) {
            if (docs > 0){
                cb(err,false);
                }
            else{
                collection.insert(flights,{w:1}, function(err, result) {});
                cb(err,true);
                }
            });
            });
        };

exports.connect= connect;
exports.db= db;
exports.close= close;
exports.clearDB= clearDB;
//exports.seed= seed;