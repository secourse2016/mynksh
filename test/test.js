var mongo = require('../config/db.js');
var flights = require('../modules/flights.json');
var request = require('supertest');
var app = require('../app/app.js');
var expect = require('chai').expect;
var should = require('chai').should;


describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get("/IBERIA").expect(404).end(function(err,res){
       done();
      
      });      
    });


    // it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin returns ', function(done) {

    // request.get("/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin").end(function(err,res){
    //        done();
    //      });

    // });
});
