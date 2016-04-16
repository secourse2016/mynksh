var MongoClient = require('mongodb').MongoClient;
var db = require("../../config/db.js");
var moment = require('moment');


module.exports = function(app, mongo) {

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/airports', function(req, res) {
        res.json(require('../../modules/airports.json'));
    });

    app.post('/api/data/bookings', function(req, res) {
        // res.json(require('../../modules/bookings.json'));
        res.send(require('../../modules/bookings.json'));
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

//middleware here!!

 app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin', function(req, res) {
     var cost = 0;
        var eOrB= req.params.cabin.toLowerCase();
        console.log()
        db.connect(function(err,db){
        var collection = db.collection('flights');
        { $or: [ {"origin": req.params.origin,"destination":req.params.destination,"departureTime": req.params.departingDate}, {
         "origin": req.params.destination,"departureTime": req.params.returningDate } ]}
        collection.find({ $or: [ {"origin": req.params.origin,"destination":req.params.destination,"departureTime": req.params.departingDate}, {
         "origin": req.params.destination,"departureTime": req.params.returningDate } ]}).toArray(function(err, flights) {
         console.log(flights[0]);
         if(flights[0] == undefined || flights[1] == undefined){
            console.log("hello");
            res.send("no flights found");
         }
         else{

         var departureDateOutgoing =flights[0].departureTime; 
         var ArrivalDateOutgoing =flights[0].arrivalTime; 
         var departureDatereturn =flights[1].departureTime; 
         var ArrivalDatereturn =flights[1].arrivalTime; 
         //console.log(moment(date, 'MMMM d, y h:mm:ss').toDate().getTime());
        if(eOrB == "economy"){
                costOut = flights[0].eCost;
                costReturn = flights[1].eCost;
            }
        else
            {
                costOut=flights[0].bCost;
                costReturn = flights[1].bCost;
            }
        if ((eOrB == "economy" && flights[0].availableESeats > 0 && flights[1].availableESeats > 0)  || (eOrB == "business" && flights[0].availableBSeats >0 && flights[1].availableBSeats >0)) {  
        outgoingFlights = 
        {
          "flightNumber"      :   flights[0].flightNumber,
          "aircraftType"      :   flights[0].aircraftType,
          "aircraftModel"     :   flights[0].aircraftModel,
          "departureDateTime" :   moment(departureDateOutgoing, 'MMMM d, y h:mm:ss').toDate().getTime(),
          "arrivalDateTime"   :   moment(ArrivalDateOutgoing, 'MMMM d, y h:mm:ss').toDate().getTime(),
          "cost"              :   costOut,  
          "currency"          :   "EUR",
          "origin"            :   req.params.origin,
          "destination"       :   flights[0].destination,
          "class"             :   eOrB,
          "Airline"           :   "IBERIA"
        };
         returnFlights = 
        {
          "flightNumber"      :   flights[1].flightNumber,
          "aircraftType"      :   flights[1].aircraftType,
          "aircraftModel"     :   flights[1].aircraftModel,
          "departureDateTime" :   moment(departureDatereturn, 'MMMM d, y h:mm:ss').toDate().getTime(),
          "arrivalDateTime"   :   moment(ArrivalDatereturn, 'MMMM d, y h:mm:ss').toDate().getTime(),
          "cost"              :   costReturn,  
          "currency"          :   "EUR",
          "origin"            :   flights[1].origin,
          "destination"       :   flights[1].destination,
          "class"             :   eOrB,
          "Airline"           :   "IBERIA"
        };
       }
        else
           outgoingFlights = {};
        //res.write("outt");
        res.send({outgoingFlights, returnFlights});
      // res.send(JSON.stringify({outgoingFlights + returnFlights}, null, 3));
          }
           });    
      });
});  

   app.get('/api/flights/search/:origin/:departingDate/:cabin', function(req, res) {

        var cost = 0;
        var eOrB= req.params.cabin.toLowerCase();
        console.log()
        db.connect(function(err,db){
        var collection = db.collection('flights');
        collection.find({"origin": req.params.origin,"departureTime": req.params.departingDate}).toArray(function(err, flights) {
         if(flights[0] == undefined){
            console.log("hello");
            res.send("no flights found");
         }
         else{
         var departureDate =flights[0].departureTime; 
         var ArrivalDate =flights[0].arrivalTime; 
         //console.log(moment(date, 'MMMM d, y h:mm:ss').toDate().getTime());
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
          "departureDateTime" :   moment(departureDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
          "arrivalDateTime"   :   moment(ArrivalDate, 'MMMM d, y h:mm:ss').toDate().getTime(),
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
          }
           });    
      });
    }); 


};
