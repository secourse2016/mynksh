var mongo = require('../config/db.js');
var flights = require('../modules/flights.json');
var request = require('supertest');
var app = require('../app/app.js');
var expect = require('chai').expect;
var should = require('chai').should;
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';


describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get("/iberia").expect(404).end(function(err,res){
       done();

      });
    });

    it('/api/flights/search/:origin/:destination/:departingDate/:cabin returns an array of JSON object(s)', function(done) {

    request.get("/api/flights/search/CAI/JED/April 13, 2016/economy?wt=" + jwt).expect(200).end(function(err,res){
         expect(res.body).to.have.property('outgoingFlights').to.be.a("array");
         done();
         });

    });
 it('/api/flights/search/:origin/:destination/:departingDate/:cabin returns empty JSON object', function(done) {

    request.get("/api/flights/search/CAI/JED/June 13, 2016/economy?wt=" + jwt).expect(200).end(function(err,res){
         // console.log(res.body);
          expect(res.body).to.be.a("object");
           done();
         });

    });
 it('/api/flights/search/:origin/:destination/:departingDate/:cabin returns 404 error!', function(done) {

    request.get("/api/flights/search/JED/April 13, 2016/economy?wt=" + jwt).expect(404).end(function(err,res){

           done();
         });

    });
  it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin returns an array of JSON object(s)', function(done) {

    request.get("/api/flights/search/CAI/JED/April 13, 2016/April 13, 2016/economy?wt=" + jwt).expect(200).end(function(err,res){
         expect(res.body).to.have.property('outgoingFlights').to.be.a("array");
         expect(res.body).to.have.property('returnFlights').to.be.a("array");
         done();
         });

    });
   it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin returns empty JSON object', function(done) {

    request.get("/api/flights/search/CAI/JED/June 13, 2016/April 13, 2016/economy?wt=" + jwt).expect(200).end(function(err,res){
         // console.log(res.body);
          expect(res.body).to.be.a("object");
           done();
         });

    });
   it('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin returns 404 error!', function(done) {

    request.get("/api/flights/search/JED/April 13, 2016/April 13, 2016/economy?wt=" + jwt).expect(404).end(function(err,res){

           done();
         });

    });

});
