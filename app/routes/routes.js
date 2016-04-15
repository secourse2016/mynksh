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

 app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate', function(req, res) {
        db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"destination": req.params.destination,
            "departureTime": req.params.departingDate, "arrivalTime":req.params.returningDate}).toArray(function(err, flights) {
        console.log(flights);
        //cb(err,flights);
        //console.log(flights);
          });    
      });
});  


//    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin', function(req, res) {
//         db.connect(function(err,db){
//         var collection = db.collection('flights');
//         collection.find({"destination": req.params.destination,"origin": req.params.origin,
//           "departureTime": req.params.departingDate, "arrivalTime":req.params.returningDate,
//           "SeatMap.Cabin":req.params.cabin}).toArray(function(err, flights) {

//         cb(err,flights);
//         console.log(flights);
//           });    
//       });
// });  

   // app.get('/api/flights/search/:origin/:departingDate/:class', function(req, res) {
   //      // retrieve params from req.params.{{origin | departingDate | ...}}
   //      // return this exact format

   //      return 
   //      {
   //        outgoingFlights: 
   //          [{
   //              "flightNumber"      : "SE2804",
   //              "aircraftType"      : "Airbus",
   //              "aircraftModel"     : "A320",
   //              "departureDateTime" : 1460478300000,
   //              "arrivalDateTime"   : 1460478300000,
   //              "origin"            : "JFK",
   //              "destination"       : "CAI",
   //              "cost"              : "1567",
   //              "currency"          : "USD",
   //              "class"             : "economy",
   //              "Airline"           : "United"
   //          }]
   //      };
   //  }); 

};
