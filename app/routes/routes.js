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
      db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"departureTime": req.params.departingDate}).toArray(function(err, flights) {
             // var onewayformat = oneWayFormat(flights, route.req.params.origin,  req.params.departingDate,
             //     req.params.cabin);
       // console.log(flights);
console.log(req.params.cabin);
//if ((req.params.cabin == "Economy" && flights.availableESeats > 0)  || (req.params.cabin == "Business" && flights.availableBSeats >0)) {  //lowercase
    
        console.log(flights[0].flightNumber);


        outgoingFlights = 
        {
          "flightNumber"      :   flights[0].flightNumber,
          "aircraftType"      :   flights[0].aircraftType,
          "aircraftModel"     :   flights[0].aircraftModel,
          "departureDateTime" :   flights[0].departureTime,
          "arrivalDateTime"   :   flights[0].arrivalTime,
         // "date"              :   moment().add(i, 'days').calendar(),
          //"cost"              : 
          "currency"          :   "EUR",
          "origin"            :   req.params.origin,
          "destination"       :   flights[0].destination,
          "class"             :   req.params.cabin,
          "Airline"           :   "IBERIA"
        };
    //}
        // else{
        //     console.log("i'm in else condition");
        //     doc = {};
       // }
       res.send(JSON.stringify({outgoingFlights}, null, 3));

       // oneWayFormat(flights,req.params.origin,  req.params.departingDate,
       //            req.params.cabin);
             // console.log(oneWayFormat(flights,req.params.origin,  req.params.departingDate,
             //      req.params.cabin));
            //res.send(oneWayFormat(flights, route.req.params.origin,  req.params.departingDate,
                //req.params.cabin));
//res.send(JSON.stringify({ a: 1 }, null, 3));
       // res.write("outgoing flights:")
       //res.json(flights);
        //res.send("outgoing flights" + flights);
           });    
      });
    }); 



 function oneWayFormat(flight, origin, departingDate, cabin) {
console.log("hello from one eay");
      if ((cabin == "Economy" && flight.availableESeats > 0)  || (cabin == "Business" && flight.availableBSeats >0)) {  //lowercase
    
        console.log("i'm in if condition");


        doc = 
        {
          "flightNumber"      :   flight.flightNumber,
          "aircraftType"      :   flight.aircraftType,
          "aircraftModel"     :   flight.aircraftModel,
          "departureDateTime" :   departingDate,
          "arrivalDateTime"   :   flight.arrivalTime,
         // "date"              :   moment().add(i, 'days').calendar(),
          //"cost"              : 
          "currency"          :   "EUR",
          "origin"            :   origin,
          "destination"       :   destination,
          "class"             :   cabin,
          "Airline"           :   "IBERIA"
        };
    }
        else{
            console.log("i'm in else condition");
            doc = {};
        }
    return doc;
      

    }
// function roundTripFormat(flights, origin, _destination) {

//       // loop until May 31 2016 starting today April-15-2016
//       for (var i = 1; i <= 46; i++) {

//         doc = 
//         {
//           "flightNumber"  :   flight.flightNumber,
//           "aircraft"      :   flight.aircraft,
//           "capacity"      :   flight.capacity,
//           "date"          :   moment().add(i, 'days').calendar(),
//           "duration"      :   flight.duration,
//           "origin"        :   _origin,
//           "destination"   :   _destination,
//           "seatmap"       :   []
//         };

//         mongo.db().collection('flights').insert(doc, function(err, data){
//           if (err) console.log('error');
//           else console.log('insert successful');
//         });
    
//       }

//     }



};
