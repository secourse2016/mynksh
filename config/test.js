var mongo = require("./api.js");
var db = require("./db.js");
var request = require('supertest');
var assert = require('chai').assert;

var insertPassengers = function(i, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, data, cb) {
  if (i === passengerDetails.length) {
    var fb = {
      refNum: data,
      errorMessage: null
    };
    cb(fb);
  } else
  if (returnFlightId === undefined || returnFlightId === null) {
    mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
      passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
      passengerDetails[i].email, cabin, cost, outgoingFlightId, data, "s",
      function(err, data2) {
        insertPassengers(i + 1, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, data2, cb);
      });
  } else {
    mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
      passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
      passengerDetails[i].email, cabin, cost, outgoingFlightId, data, "s",
      function(err, data2) {
        mongo.submitPay(passengerDetails[i].firstName, passengerDetails[i].lastName, passengerDetails[i].passportNum,
          passengerDetails[i].passportExpiryDate, passengerDetails[i].dateOfBirth, passengerDetails[i].nationality,
          passengerDetails[i].email, cabin, cost, returnFlightId, data2, "r",
          function(err, data3) {
            insertPassengers(i + 1, passengerDetails, cabin, cost, outgoingFlightId, returnFlightId, data3, cb);
          });
      });
  } //end of else
}

var newres = [{
  "firstName": "qwwww",
  "lastName": "qwwww",
  "passportNum": "qwwww",
  "passportExpiryDate": "qwwww",
  "dateOfBirth": "qwwww",
  "nationality": "qwwww",
  "email": "qwwww",
}, {
  "firstName": "uuuuu",
  "lastName": "uuuuu",
  "passportNum": "uuuuu",
  "passportExpiryDate": "uuuuu",
  "dateOfBirth": "uuuuu",
  "nationality": "uuuuu",
  "email": "uuuuu",
}, {
  "firstName": "zzzzz",
  "lastName": "zzzzz",
  "passportNum": "zzzzz",
  "passportExpiryDate": "zzzzz",
  "dateOfBirth": "zzzzz",
  "nationality": "zzzzz",
  "email": "zzzzz",
}, {
  "firstName": "vvvvvvvv",
  "lastName": "vvvvvvvv",
  "passportNum": "vvvvvvvv",
  "passportExpiryDate": "vvvvvvvv",
  "dateOfBirth": "vvvvvvvv",
  "nationality": "vvvvvvvv",
  "email": "vvvvvvvv",
}, {
  "firstName": "22222222",
  "lastName": "22222222",
  "passportNum": "22222222",
  "passportExpiryDate": "22222222",
  "dateOfBirth": "22222222",
  "nationality": "22222222",
  "email": "22222222",
}]

paymentInfo = {
  "passengerDetails": newres,
  "class": 'economy',
  "cost": 12321312,
  "outgoingFlightId": "5728c8a0a5771909178f4585",
  "returnFlightId": "5728c8a0a5771909178f4584",
  "paymentToken": 2112
}

db.init('mongodb://localhost:27017/mynksh', function() {
  insertPassengers(0, paymentInfo.passengerDetails, paymentInfo.class, paymentInfo.cost,
    paymentInfo.outgoingFlightId, paymentInfo.returnFlightId, true,
    function(fb) {
      console.log(fb);
    });
});


describe('seedDB test', function() {
  // before(db.clearDB);
  it('should populate the db if db is empty returning true', function(done) {
    db.init('mongodb://localhost:27017/mynksh', function() {
      mongo.seedDB(function(error, seeded) {
        assert.equal(seeded, true, 'DB has seeded the items');
        done();
      });
    });
  });
  it('should have populated the airlines collection with 27 document', function(done) {
    db.init('mongodb://localhost:27017/mynksh', function() {
      mongo.seedDB(function(error, seeded) {
        db.db().collection('airLines').find().toArray(function(err, items) {
          assert.lengthOf(items, 27, 'DB has 27 items');
          done();
        });
      });
    });
  });
  it('should not seed db again if db is not empty', function(done) {
    db.init('mongodb://localhost:27017/mynksh', function() {
      mongo.seedDB(function(error, seeded) {
        mongo.seedDB(function(error, seeded) {
          db.db().collection('airLines').find().toArray(function(err, items) {
            assert.lengthOf(items, 27, 'airLines has 27 items');
            done();
          });
        });
      });
    });
    // it('should not seed db again if db is not empty', function(done) {
    //     mongo.seedDB(function(error, seeded){
    //             mongo.seedDB(function(error, seeded){
    //                 db.db().collection('flights').toArray(function(err,items){
    //                 assert.lengthOf(items,980,'flights has 980 items');
    //                 done();
    //             });     
    //         });    
    //     });
    // });
    // it('should not seed db again if db is not empty', function(done) {
    //     mongo.seedDB(function(error, seeded){
    //             mongo.seedDB(function(error, seeded){
    //                 db.db().collection('airports').toArray(function(err,items){
    //                 assert.lengthOf(items,18,'airports has 18 items');
    //                 done();
    //             });     
    //         });    
    //     });
    // });
    
});


// describe('clearDB test', function() {
//   it('Should return the no. of elements in the db', function(done){
//     mongo.clearDB(function(error, cleared){
//         assert.equal(0,cleared);

//   });
//   it('should not seed db again if db is not empty', function(done) {
//     db.init('mongodb://localhost:27017/mynksh', function() {
//       mongo.seedDB(function(error, seeded) {
//         mongo.seedDB(function(error, seeded) {
//           db.db().collection('flights').find().toArray(function(err, items) {
//             assert.lengthOf(items, 980, 'flights has 980 items');
//             done();
//           });
//         });
//       });
//     });
//   });
//   it('should not seed db again if db is not empty', function(done) {
//     db.init('mongodb://localhost:27017/mynksh', function() {
//       mongo.seedDB(function(error, seeded) {
//         mongo.seedDB(function(error, seeded) {
//           db.db().collection('airports').find().toArray(function(err, items) {
//             assert.lengthOf(items, 18, 'airports has 18 items');
//             done();
//           });
//         });
//       });
//     });
//   });

// });
// });

// describe('clearDB test', function() {
//   it('Should return the no. of elements in the db to be 0', function(done) {
//     mongo.clearDB(function(error, cleared) {
//       assert.equal(cleared, true, 'should be true');
//       done();
//     });
//   });
// });


describe('getAirportsFromDB', function() {
 db.init('mongodb://localhost:27017/mynksh', function() {   
  it('should return all Airports documents in the database', function(done) {
    mongo.getAirports(function(err, airports) {
      assert.equal(airports.length, 18);
      done();
    });
  });
  });
});

describe('getAirlinesFromDB', function() {
    db.init('mongodb://localhost:27017/mynksh', function() { 
  it('should return all Airlines documents in the database', function(done) {
    mongo.getAirLines(function(err, airLines) {
      assert.equal(airLines.length, 27);
      done();
    });
  });
});
});

describe('getAirlineIPFromDB', function() {
 db.init('mongodb://localhost:27017/mynksh', function() { 
  it('should return the Airline IP from the database', function(done) {
    mongo.getAirLineIP("Trukish", function(err, airLineIP) {
      assert.equal(airLineIP, "52.27.150.19");
      done();
    });
  });
});
});

describe('getAirlineIPFromDB', function() {
   db.init('mongodb://localhost:27017/mynksh', function() {  
    it('should return the Airline IP from the database', function(done) {
        mongo.getAirLineIP("Lufthansa",function(err,airLineIP){
            assert.equal(airLineIP,"ec2-54-152-123-100.compute-1.amazonaws.com");
            done();
        });
    });
});
});

describe('searchFlightsFromDB', function() {
    db.init('mongodb://localhost:27017/mynksh', function() { 
    it('should return the flights desired from the database', function(done) {
        mongo.searchFlights("BOM","DEL","April 13, 2016 08:00:00","economy",2,function(err,rflights){
            assert.equal(rflights.length,1);
            assert.equal(rflights[0].class,"economy");
            done();
        });
    });
});
});

describe('searchFlightsFromDB', function() {
    db.init('mongodb://localhost:27017/mynksh', function() { 
    it('should return the flights desired from the database', function(done) {
        mongo.searchFlights("CAI","JED","April 13, 2016 18:30:00","business",2,function(err,rflights){
            assert.equal(rflights.length,1);
            assert.equal(rflights[0].class,"business");
            done();
        });
    });
});
});

describe('submitpayTODB', function() {
    db.init('mongodb://localhost:27017/mynksh', function() { 
    it('should return the flights desired from the database', function(done) {
        mongo.submitPay("Haze","Elessawy","123456789","July 17, 2016","17/07/1995","Egypt","hazem.279hotmail.com","business","57293ab5315dcfa617a9a173",true,"outgoing",function(err,bookingref){
            assert.isAbove(bookingref.length,1);
            done();
        });
    });
  });
 });     
});

describe('searchBookingsTODB', function() {
    db.init('mongodb://localhost:27017/mynksh', function() { 
    it('should return the flights desired from the database', function(done) {
        mongo.submitPay("18y0q80wdhj",function(err,ref){
            assert.isAtLeast(ref.length,1);
            done();
        });
    });
  });
 });  


// it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
//     request.get('/api/quote').set('Accept','application/json').expect('Content-Type',/json/).expect(function(res){
//         assert.property(res.body,'_id','object has an id');
//         assert.property(res.body,'text','object has a text');
//         assert.property(res.body,'author','object has an author');
//         // assert.isString(res.body.author);
//     }).expect(200,done);
// });

// it('/api/quotes should return an array of JSON object when I visit', function(done) {
//     request.get('/api/quotes').set('Accept','application/json').expect('Content-Type',/json/).expect(200,done);
// });
// });
