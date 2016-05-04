//var mongo = require('../config/db.js');

var flights = require('../modules/flights.json');

var request = require('supertest');

var app = require('../app/app.js');

var expect = require('chai').expect;

var should = require('chai').should;

var db = require('../config/db.js');

var mongo = require('../config/api.js');

var assert = require('chai').assert;

var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';

describe('API', function() {

    request = request(app);

    it("should return a 404 for urls that don't exist", function(done) {

        // TODO: test with supertest

        request.get("/iberia").expect(404).end(function(err,res){

       done();

      });

    });

    it('/api/flights/search/:origin/:destination/:departingDate/:cabin/:seats returns JSON object(s)', function(done) {

    request.get('/api/flights/search/CAI/JED/April30,2016/May2,2016/business/2?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ').expect(200).end(function(err,res){

         expect(res.body).to.be.a("object");

         done();

         });

    });

 it('/api/flights/search/:origin/:destination/:departingDate/:cabin/:seats returns empty JSON object', function(done) {

    request.get("/api/flights/search/CAI/JED/June 13, 2016/economy/2?wt=" + jwt).expect(200).end(function(err,res){

         // console.log(res.body);

          expect(res.body).to.be.a("object");

           done();

         });

    });

 it('/api/flights/search/:origin/:destination/:departingDate/:cabin/:seats returns 404 error!', function(done) {

    request.get("/api/flights/search/JED/April 13, 2016/economy/2?wt=" + jwt).expect(404).end(function(err,res){

           done();

         });

    });

  it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin/:seats returns an array of JSON object(s)', function(done) {

    request.get("/api/flights/search/CAI/JED/April 30, 2016/May 2, 2016/economy/2?wt=" + jwt).expect(200).end(function(err,res){

         expect(res.body).to.be.a("object");

          expect(res.body).to.be.a("object");

         done();

         });

    });

   it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin/:seats returns empty JSON object', function(done) {

    request.get("/api/flights/search/CAI/JED/June 13, 2016/April 13, 2016/economy/2?wt=" + jwt).expect(200).end(function(err,res){

         // console.log(res.body);

          expect(res.body).to.be.a("object");

           done();

         });

    });

   it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin/:seats returns 404 error!', function(done) {

    request.get("/api/flights/search/JED/April 13, 2016/April 13, 2016/economy/2?wt=" + jwt).expect(404).end(function(err,res){

           done();

         });

    });

});

describe('seedDB test', function() {

   it('should populate the db if db is empty returning true', function(done) {

    db.init('mongodb://localhost:27017/mynksh', function() {

      mongo.seedDB(function(error, seeded) {

        assert.equal(seeded, true, 'DB has seeded the items');

        done();

      });

    });

  });

  it('should return all Airlines documents in the database', function(done) {

db.init('mongodb://localhost:27017/mynksh', function() {

mongo.getAirLines(function(err, airLines) {

  assert.equal(airLines.length, 28);

  done();

});

});

});

  it('should not seed db again if db is not empty', function(done) {

    db.init('mongodb://localhost:27017/mynksh', function() {

        mongo.seedDB(function(error, seeded) {

          db.db().collection('airLines').find().toArray(function(err, items) {

            assert.lengthOf(items, 28, 'airLines has 28 items');

            done();

          });

        });

    });

    });

      it('should return Airline IP from DB', function(done) {

    db.init('mongodb://localhost:27017/mynksh', function() {

      mongo.getAirLineIP("Trukish", function(err, airLineIP) {

          assert.equal(airLineIP, "52.27.150.19");

          done();

        });

    });

    });

      it('should return Airline IP from DB', function(done) {

      db.init('mongodb://localhost:27017/mynksh', function() {

        mongo.getAirLineIP("Lufthansa", function(err, airLineIP) {

            assert.equal(airLineIP, "ec2-54-152-123-100.compute-1.amazonaws.com");

            done();

          });

      });

      });

      it('should return all Airports documents in the database', function(done) {

     db.init('mongodb://localhost:27017/mynksh', function() {

        mongo.getAirports(function(err, airports) {

          assert.equal(airports.length, 18);

          done();

        });

      });

      });

      it('should return the flights desired from the database', function(done) {

        db.init('mongodb://localhost:27017/mynksh', function() {

        mongo.searchFlights("BOM","DEL","April 13, 2016 08:00:00","economy",2,function(err,rflights){

            assert.equal(rflights.length,1);

            assert.equal(rflights[0].class,"economy");

            done();

        });

    });

});

      it('should return the flights desired from the database', function(done) {

          db.init('mongodb://localhost:27017/mynksh', function() {

        mongo.searchFlights("CAI","JED","April 13, 2016 18:30:00","business",2,function(err,rflights){

            assert.equal(rflights.length,1);

            assert.equal(rflights[0].class,"business");

            done();

        });

    });

});

});
