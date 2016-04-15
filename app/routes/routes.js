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

//  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin', function(req, res) {
//         db.connect(function(err,db){
//         var collection = db.collection('flights');
//         collection.find({"origin": req.params.origin,"destination": req.params.destination,
//             "departureTime": req.params.departingDate, "arrivalTime":req.params.returningDate
//             ,"SeatMap.Cabin":req.params.cabin}).toArray(function(err, flights) {

//         res.json(flights);
//            });
//       });
// });

   app.get('/api/flights/search/:origin/:departingDate/:cabin', function(req, res) {
        var cost = 0;
        var eOrB= req.params.cabin.toLowerCase();
      db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"departureTime": req.params.departingDate}).toArray(function(err, flights) {
        if(eOrB == "economy"){
                cost = flights[0].eCost;
            }
        else
            {
                cost=flights[0].bCost;
            }
        if ((eOrB == "economy" && flights[0].availableESeats > 0)  || (eOrB == "business" && flights[0].availableBSeats >0)) {
        outgoingFlights =
        {
          "flightNumber"      :   flights[0].flightNumber,
          "aircraftType"      :   flights[0].aircraftType,
          "aircraftModel"     :   flights[0].aircraftModel,
          "departureDateTime" :   flights[0].departureTime,
          "arrivalDateTime"   :   flights[0].arrivalTime,
          "cost"              :   cost,
          "currency"          :   "EUR",
          "origin"            :   req.params.origin,
          "destination"       :   flights[0].destination,
          "class"             :   eOrB,
          "Airline"           :   "IBERIA"
        };
    }
        else
           outgoingFlights = {};

       res.send(JSON.stringify({outgoingFlights}, null, 3));
           });
      });
    });


    app.get('/api/returnInfo', function(req, res) {
        res.json(require('../../modules/returnInfo.json'));
    });
    /* SEED DB */
    app.get('/db/seed', function(req, res) {
    });

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {
    });
};
