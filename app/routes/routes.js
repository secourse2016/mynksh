var MongoClient = require('mongodb').MongoClient;
var db = require("../../config/db.js");


module.exports = function(app, mongo) {

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/airports', function(req, res) {
        res.json(require('../../modules/airports.json'));
    });

    app.post('/api/data/bookings', function(req, res) {
        // res.json(require('../../modules/bookings.json'));
        res.send(require('../../modules/bookings.json'));
    });

    /* RENDER MAIN PAGE */
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

//middleware here!!

 app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin', function(req, res) {
        db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"destination": req.params.destination,
            "departureTime": req.params.departingDate, "arrivalTime":req.params.returningDate
            ,"SeatMap.Cabin":req.params.cabin}).toArray(function(err, flights) {
        res.json(flights);
           });    
      });
});  


   app.get('/api/flights/search/:origin/:departingDate/:cabin', function(req, res) {
      db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"departureTime": req.params.departingDate, 
        "SeatMap.Cabin":req.params.cabin}).toArray(function(err, flights) {
        res.json(flights);
           });    
      });
    }); 

};
