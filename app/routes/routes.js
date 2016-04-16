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
  req.db.searchFlights(req.params.origin, req.params.destination, req.params.departingDate, req.params.cabin, function(err, outgoingFlight) {
    req.db.searchFlights(req.params.destination, req.params.origin, req.params.returningDate, req.params.cabin, function(err, returnFlight) {
      var flights = {};
      flights.outgoingFlights = outgoingFlight;
      flights.returnFlights = returnFlight;
        res.json(flights);
    });
  });
});

app.get('/api/flights/search/:origin/:destination/:departingDate/:cabin', function(req, res) {
    req.db.searchFlights(req.params.origin, req.params.destination, req.params.departingDate, req.params.cabin, function(err, outgoingFlight) {
      var flights = {};
      flights.outgoingFlights = outgoingFlight;
        res.json(flights);
    });
});


app.get('/api/returnInfo', function(req, res) {
    res.json(require('../../modules/returnInfo.json'));
});
/* SEED DB */
app.get('/db/seed', function(req, res) {
    req.db.seedDB();
});

/* DELETE DB */
app.get('/db/delete', function(req, res) {});
};
