var jwt = require('jsonwebtoken');
var moment = require('moment');
var airlines = require('../../modules/airLines.json');
var http = require('http');
var stripe = require('stripe')(process.env.StripeSecret);

module.exports = function(app, mongo) {

  /* RENDER MAIN PAGE */
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '../../public/index.html');
  });

  /* SEED DB */
  app.get('/db/seed', function(req, res) {
    mongo.seedDB(function(err, param) {
      res.send("Seeding done");
    });
  });

  /* DELETE DB */
  app.get('/db/delete', function(req, res) {
    mongo.clearDB(function(err) {
      res.send("DB clear");
    });
  });

  /* GET ALL STATES ENDPOINT */
  app.get('/data/airports', function(req, res) {
    mongo.getAirports(function(err, airports) {
      res.json(airports);
    })
  });



  app.get('/data/airlines', function(req, res) {
    // mongo.getAirports(function(err, airports) {
    mongo.getAirLines(function(err, airLines) {
        res.json(airLines);
      })
      // })
  });

  // get ip of given airline name
  app.get('/data/singleAirline/:airlineName', function(req, res) {
    if (req.params.airlineName === "Iberia")
      res.json("Iberia");
    else
      mongo.getAirLineIP(req.params.airlineName, function(err, airLineIPAdress) {
        res.json(airLineIPAdress);
      })

  });
  // end of get ip method

  app.get('/data/seatMap/:flight', function(req, res) {
    mongo.getSeatMap(req.params.flight, function(err, airLines) {
      res.json(airLines);
    })
  });

  app.get('/data/bookings/search/:bookingRefNumber', function(req, res) {
    mongo.searchBookings(req.params.bookingRefNumber, function(err, bookingRef) {
      res.json(bookingRef);
    });
  });

  app.get('/api/others/search/:ip/:origin/:destination/:departingDate/:returningDate/:cabin/:seats/:wt', function(req, res1) {
    var options = {
      host: req.params.ip,
      path: '/api/flights/search/' + req.params.origin + '/' + req.params.destination + '/' + req.params.departingDate +
        '/' + req.params.returningDate + '/' + req.params.cabin + '/' + req.params.seats + '/?wt=' + req.params.wt,
      json: true
    };
    var timeout_wrapper = function(req) {
      return function() {
        // do some logging, cleaning, etc. depending on req
        req.abort();
      };
    };
    var request = http.get(options, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
        clearTimeout(timeout);
        timeout = setTimeout(fn, 10000);
      });
      res.on('end', function() {
        try {
          clearTimeout(timeout);
          var fbResponse = JSON.parse(body);
          res1.send(fbResponse);
        } catch (err) {
          try {
            res1.status(500).send("Error");
          } catch (err) {}
        }
      });
    }).on('error', function(e) {
      clearTimeout(timeout);
      try {
        res1.status(500).send("Error");
      } catch (err) {}
      this.abort();
    });
    // generate timeout handler
    var fn = timeout_wrapper(request);

    // set initial timeout
    var timeout = setTimeout(fn, 1000);
  });

  app.get('/api/others/search/:ip/:origin/:destination/:departingDate/:cabin/:seats/:wt', function(req, res1) {
    var options = {
      host: req.params.ip,
      path: '/api/flights/search/' + req.params.origin + '/' + req.params.destination + '/' + req.params.departingDate +
        '/' + req.params.cabin + '/' + req.params.seats + '/?wt=' + req.params.wt,
      json: true
    };
    var timeout_wrapper = function(req) {
      return function() {
        // do some logging, cleaning, etc. depending on req
        req.abort();
      };
    };
    var request = http.get(options, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
        clearTimeout(timeout);
        timeout = setTimeout(fn, 1000);
      });
      res.on('end', function() {
        try {
          clearTimeout(timeout);
          var fbResponse = JSON.parse(body);
          res1.send(fbResponse);
        } catch (err) {
          try {
            res1.status(500).send("Error");
          } catch (err) {}
        }
      });
    }).on('error', function(e) {
      clearTimeout(timeout);
      try {
        res1.status(500).send("Error");
      } catch (err) {}
      this.abort();
    });
    // generate timeout handler
    var fn = timeout_wrapper(request);

    // set initial timeout
    var timeout = setTimeout(fn, 1000);
  });
  app.post('/choosingSeat', function(req, res) {
    if (req.body.flightNumber !== undefined && req.body.oldSeats !== undefined && req.body.newSeats !== undefined && req.body.bookingRefNumber !== undefined)
      mongo.changeSeats(req.body.flightNumber, req.body.oldSeats, req.body.newSeats, req.body.bookingRefNumber, function(done) {
        if (done === true)
          res.send("It was successfull");
        else
          res.send("It was unsuccessful");
      });
    else
      res.send("Error")
  });

  /* Middlewear For Secure API Endpoints */
  app.use('/api/flights/search' | '/booking' | '/stripe/pubkey', function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.wt || req.query.wt || req.headers['x-access-token'];
    var jwtSecret = process.env.JWTSECRET;
    // Get JWT contents:
    try {
      var payload = jwt.verify(token, jwtSecret);
      req.payload = payload;
      next();
    } catch (err) {
      console.error('[ERROR]: JWT Error reason:', err);
      res.status(403).sendFile(__dirname + '../../public/views/error.html');
    }
  });

  app.post('/booking', function(req, res1) {
    stripe.charges.create({
      amount: req.body.cost.toFixed(2) * req.body.passengerDetails.length *100,
      currency: "USD",
      source: req.body.paymentToken,
      description: "Example charge"
    }, function(err, charge) {
      if (err) {
        res1.send({
          refNum: null,
          errorMessage: err.message
        });
      } else {
        mongo.check(req.body.passengerDetails, req.body.class, req.body.cost, req.body.outgoingFlightId, req.body.returnFlightId, function(err) {
          if (err !== null)
            res1.send({
              refNum: null,
              errorMessage: err
            });
          else {
            insertPassengers(0, req.body.passengerDetails, req.body.class, req.body.cost,
              req.body.outgoingFlightId, req.body.returnFlightId, null, true,
              function(fb) {
                res1.send(fb);
              });
          }

        });
      }
    });
  });

  var insertPassengers = function(i, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, error, data, cb) {
    if (i === passengerDetails.length || (error !== null && error !== undefined)) {
      var fb = {
        refNum: data,
        errorMessage: error
      };
      cb(fb);
    } else
    if (returnFlightId === undefined || returnFlightId === null) {
      mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
        passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
        passengerDetails[i].email, cabin, cost, outgoingFlightId, data, "outgoing",
        function(err, data2) {
          insertPassengers(i + 1, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, err, data2, cb);
        });
    } else {
      mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
        passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
        passengerDetails[i].email, cabin, cost, outgoingFlightId, data, "outgoing",
        function(err, data2) {
          mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
            passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
            passengerDetails[i].email, cabin, cost, returnFlightId, data2, "return",
            function(err2, data3) {
              var err3 = err;
              if (err2 !== null && err2 !== undefined)
                err3 = err2;
              insertPassengers(i + 1, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, err3, data2, cb);
            });
        });
    }
  }

  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin/:seats', function(req, res) {
    if (moment(req.params.departingDate, 'MMMM D, YYYY').format('MMMM D, YYYY') === req.params.departingDate) {
      var departDate = req.params.departingDate;
      var outDate = req.params.returningDate;
    } else {
      var departDate = moment(parseInt(req.params.departingDate)).format('MMMM D, YYYY');
      var outDate = moment(parseInt(req.params.returningDate)).format('MMMM D, YYYY');
    }
    mongo.searchFlights(req.params.origin, req.params.destination, departDate, req.params.cabin, req.params.seats, function(err, outgoingFlight) {
      mongo.searchFlights(req.params.destination, req.params.origin, outDate, req.params.cabin, req.params.seats, function(err, returnFlight) {
        var flights = {};
        flights.outgoingFlights = outgoingFlight;
        flights.returnFlights = returnFlight;
        res.json(flights);
      });
    });
  });


  app.get('/stripe/pubkey', function(req, res) {
    res.json('pk_test_fWP8viqFbT95teED8zWD3ieK');

  });


  app.get('/api/flights/search/:origin/:destination/:departingDate/:cabin/:seats', function(req, res) {
    if (moment(req.params.departingDate, 'MMMM D, YYYY').format('MMMM D, YYYY') === req.params.departingDate)
      var departDate = req.params.departingDate;
    else
      var departDate = moment(parseInt(req.params.departingDate)).format('MMMM D, YYYY');
    mongo.searchFlights(req.params.origin, req.params.destination, departDate, req.params.cabin, req.params.seats, function(err, outgoingFlight) {
      var flights = {};
      flights.outgoingFlights = outgoingFlight;
      res.json(flights);
    });
  });


};
