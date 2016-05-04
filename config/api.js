var mongo = require('./db.js');
var flights = require('../modules/flights.json');
var airports = require('../modules/airports.json');
var bookings = require('../modules/bookings.json');
var airlines = require('../modules/airLines.json');
var assert = require('assert');
var moment = require('moment');
var ObjectId = require('mongodb').ObjectId;

exports.seedDB = function(cb) {
  mongo.clearDB(function(err) {
    assert.equal(null, err);
    mongo.seed('flights', flights, function() {
      mongo.seed('airLines', airlines, function() {
        mongo.seed('airports', airports, function() {
          cb(err, true);
        });
      });
    });
  });
};

exports.clearDB = function(cb) {
  mongo.clearDB(function() {
    cb();
  });;
}

exports.getAirports = function(cb) {
  var collection = mongo.db().collection('airports');
  collection.find().toArray(function(err, airports) {
    cb(err, airports);
  });
}

exports.getAirLines = function(cb) {
  var collection = mongo.db().collection('airLines');
  collection.find().toArray(function(err, airLines) {
    cb(err, airLines);
  });
}

exports.getSeatMap = function(flight, cb) {
  var collection = mongo.db().collection('flights');
  collection.find({
    "flightNumber": flight
  }).toArray(function(err, airLines) {
    cb(err, airLines[0].SeatMap);
  });
}

exports.getAirLineIP = function(airLineName, cb) {
  var airLineIP = "";
  if (airLineName === "Iberia") {
    cb(null, 'Iberia');
    return;
  }
  var collection = mongo.db().collection('airLines');
  collection.find({
    "name": airLineName + " Airlines"
  }).toArray(function(err, airLine) {
    if (airLine.length === 0) {
      cb(err, "No ip with this Name");
      return;
    }
    airLineIP = airLine[0].ip;
    cb(err, airLineIP);
  });
}

exports.getBooking = function(cb) {
  var collection = mongo.db().collection('bookings');
  collection.find().toArray(function(err, bookings) {
    cb(err, bookings);
  });
}

exports.searchFlights = function(origin, destination, departingDate, cabin, seats, cb) {
  var cost = 0;
  var economyOrBusiness = cabin.toLowerCase();
  var reqSeats = seats;
  if (reqSeats === undefined)
    reqSeats = 1;
  var collection = mongo.db().collection('flights');
  collection.find({
    "origin": origin,
    "destination": destination,
    "departureTime": {
      '$regex': departingDate
    }
  }).toArray(function(err, flights) {
    if (flights.length === 0) {
      cb(err, []);
      return;
    } else {
      if (economyOrBusiness == "economy")
        cost = flights[0].eCost;
      else
        cost = flights[0].bCost;
      if ((economyOrBusiness == "economy" && flights[0].availableESeats >= reqSeats) || (economyOrBusiness == "business" && flights[0].availableBSeats >= reqSeats)) {
        var departureDate = flights[0].departureTime;
        var arrivalDate = flights[0].arrivalTime;
        rflights = [{
          "flightId": flights[0]._id,
          "flightNumber": flights[0].flightNumber,
          "aircraftType": flights[0].aircraftType,
          "aircraftModel": flights[0].aircraftModel,
          "departureDateTime": moment(departureDate, 'MMMM D, YYYY hh:mm:ss').toDate().getTime(),
          "arrivalDateTime": moment(arrivalDate, 'MMMM D, YYYY hh:mm:ss').toDate().getTime(),
          "cost": cost,
          "currency": "USD",
          "origin": origin,
          "destination": flights[0].destination,
          "class": economyOrBusiness,
          "Airline": "Iberia"
        }];
      } else
        rflights = {};
      cb(err, rflights);
    }
  });
}

exports.submitPay = function(firstName, lastName, passportNumber, expiryDate, dateOfBirth, passport, email, businessOrEconomic, cost, flightId, generateOrUseOld, fWay, cb) {
  var selectedSeat = 0;
  if (flightId === undefined) {
    cb("flightId was not passed", null);
    return;
  }
  var collection = mongo.db().collection('flights');
  collection.find({
    "_id": new ObjectId(flightId)
  }).toArray(function(err, flights) {
    if (flights.length === 0) {
      cb("This flight " + flightId + "is not supported be Iberia", null);
      return;
    }
    if (businessOrEconomic === "economy") {
      if (!(flights[0].availableESeats === 0)) {
        selectedSeat = flights[0].nextEcoSeat;
        flights[0].availableESeats = flights[0].availableESeats - 1;
        flights[0].nextEcoSeat = flights[0].nextEcoSeat + 1;
      }
    } else {
      if (!(flights[0].availableBSeats === 0)) {
        selectedSeat = flights[0].nextBusSeat;
        flights[0].availableBSeats = flights[0].availableBSeats - 1;
        flights[0].nextBusSeat = flights[0].nextBusSeat - 1;
      }
    }

    var bookingReference;
    var bSeat = flights[0].nextBusSeat;
    var eSeat = flights[0].nextEcoSeat;
    if (generateOrUseOld === true)
      bookingReference = generateBookingRef(flights[0].SeatMap[selectedSeat].seatNum, flights[0].flightNumber, businessOrEconomic);
    else
      bookingReference = generateOrUseOld;
    flights[0].SeatMap[selectedSeat].bookingRefNumber = bookingReference;

    mongo.db().collection("flights").update({
      "_id": new ObjectId(flightId)
    }, {
      $set: {
        "availableESeats": flights[0].availableESeats,
        "availableBSeats": flights[0].availableBSeats,
        "nextBusSeat": bSeat,
        "nextEcoSeat": eSeat,
        "SeatMap": flights[0].SeatMap
      }
    }, {
      upsert: false
    }, function(err, results) {

      var collection = mongo.db().collection('bookings');
      var document = {
        "firstName": firstName,
        "lastName": lastName,
        "passport": passport,
        "passportNumber": passportNumber,
        "expiryDate": expiryDate,
        "email": email,
        "bookingRefNumber": bookingReference,
        "flightNumber": flights[0].flightNumber,
        "seatNum": flights[0].SeatMap[selectedSeat].seatNum,
        "origin": flights[0].origin,
        "destination": flights[0].destination,
        "arrivalTime": flights[0].arrivalTime,
        "departureTime": flights[0].departureTime,
        "way": fWay
      };
      collection.insertOne(document, {
        w: 1
      }, function(err, records) {
        cb(err, document.bookingRefNumber);
      });
    });
  });
}

exports.check = function(passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, cb) {
  if (cabin === undefined || cabin === null) {
    cb("Please specify the cabin economy/business.");
    return;
  }
  var validCabin = cabin.toLowerCase();
  if (validCabin !== "economy" && validCabin !== "business") {
    cb("The chosen class is not supported by IBERIA.");
    return;
  }
  for (var i = 0; i < passengerDetails.length; i++) {
    if (passengerDetails[i].firstName === undefined) {
      cb("Passenger " + i + "'s first name was not defined.");
      return;
    }
    if (passengerDetails[i].lastName === undefined) {
      cb("Passenger " + i + "'s last name was not defined.");
      return;
    }
    if (passengerDetails[i].passportNum === undefined) {
      cb("Passenger " + i + "'s passport number was not defined.");
      return;
    }
    if (passengerDetails[i].passportNum === undefined) {
      cb("Passenger " + i + "'s passport number was not defined.");
      return;
    }
    if (passengerDetails[i].dateOfBirth === undefined) {
      cb("Passenger " + i + "'s date of birth was not defined.");
      return;
    }
  }
  var tickets = passengerDetails.length;
  var outgoingCost = 0;
  var returnCost = 0;
  var expectedCost = 0;
  if (outgoingFlightId !== undefined && outgoingFlightId !== null)
    getFlightCost(outgoingFlightId, validCabin, function(cbOutCost) {
      outgoingCost = cbOutCost;
      if (returnFlightId !== undefined && returnFlightId !== null)
        returnCost = getFlightCost(returnFlightId, validCabin, function(cbReturnCost) {
          returnCost = cbReturnCost;
          if (outgoingCost === -1) {
            cb("The outgoing flight is not supported by Iberia.");
            return;
          } else if (returnCost === -1) {
            cb("The return flight is not supported by Iberia.");
            return;
          } else {
            expectedCost = (outgoingCost + returnCost) * tickets;

          }
          if (expectedCost !== cost) {
            cb("The cost of the trip is not as expected");
            return;
          }
        });
    });
  cb(null);
}
var getFlightCost = function(flightId, cabin, price) {
  var collection = mongo.db().collection('flights');
  var ticketPrice = 0;
  collection.find({
    "_id": new ObjectId(flightId)
  }).toArray(function(err, flights) {

    if (flights.length === 0)
      ticketPrice = -1;
    if (cabin === "economy")
      ticketPrice = flights[0].eCost;
    else
      ticketPrice = flights[0].bCost;
    price(ticketPrice);
  });
}

exports.searchBookings = function(bookingRef, cb) {
  var collection = mongo.db().collection('bookings');
  collection.find({
    "bookingRefNumber": bookingRef
  }).toArray(function(err, ref) {
    if (ref[0] == undefined)
      cb(err, []);
    else
      cb(err, ref);
  });
}


var generateBookingRef = function(seatnum, flightNumber, businessOrEconomic) {
  return encoded = new Buffer(seatnum + ',' + flightNumber).toString('base64');
}

exports.changeSeats = function(flightNumber, oldSeats, newSeats, bookingRefNumber, cb) {
  getSeatMap(flightNumber, function(oldSeatMap) {
    changeSeatMap(oldSeatMap, newSeats, oldSeats, bookingRefNumber, function(newSeatMap) {
      recurs(0, newSeats, oldSeats, bookingRefNumber, function() {
        updateSeatMap(flightNumber, newSeatMap, function(done) {
          if (done)
            cb(true);
        });
      })
    });
  });

}
var changeSeatMap = function(oldSeatMap, newSeats, oldSeats, bookingRefNumber, cb) {
  for (var i = 0; i < oldSeatMap.length; i++) {
    for (var j = 0; j < oldSeats.length; j++) {
      if (oldSeatMap[i].seatNum === oldSeats[j])
        oldSeatMap[i].bookingRefNumber = null;
      if (oldSeatMap[i].seatNum === newSeats[j])
        oldSeatMap[i].bookingRefNumber = bookingRefNumber;
    }
  }
  cb(oldSeatMap);

}
var getSeatMap = function(flightNumber, cb) {
  var collection = mongo.db().collection('flights');
  collection.find({
    "flightNumber": flightNumber
  }).toArray(function(err, flight) {
    cb(flight[0].SeatMap);

  });
}
var updateSeatMap = function(flightNumber, newSeatMap, cb) {
  mongo.db().collection("flights").update({
    "flightNumber": flightNumber
  }, {
    $set: {
      "SeatMap": newSeatMap
    }
  }, {
    upsert: false
  }, function(err, results) {
    if (err === undefined || err === null)
      cb(true);
    else
      cb(false);
  });
};
var recurs = function(i, seat, seatOld, bookingRefNumber, cb) {
  if (i === seat.length)
    cb();
  else
    updateBooking(seat[i], seatOld[i], bookingRefNumber, function() {
      i++;
      recurs(i, seat, seatOld, bookingRefNumber, cb);
    })
}
var updateBooking = function(seat, seatOld, bookingRefNumber, cb) {
  mongo.db().collection("bookings").update({
    "bookingRefNumber": bookingRefNumber,
    "seatNum": seatOld
  }, {
    $set: {
      "seatNum": seat
    }
  }, {
    upsert: false
  }, function(err, results) {
    cb();
  });
};
