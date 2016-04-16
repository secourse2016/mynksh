var jwt = require('jsonwebtoken');

module.exports = function(app, mongo) {

    /* RENDER MAIN PAGE */
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/airports', function(req, res) {
        res.json(require('../../modules/airports.json'));
    });

    app.post('/api/data/bookings', function(req, res) {
        // res.json(require('../../modules/bookings.json'));
        res.send(require('../../modules/bookings.json'));
    });

    /* Middlewear For Secure API Endpoints */
    app.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.wt || req.query.wt || req.headers['x-access-token'] || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
        // console.log("{{{{ TOKEN }}}} => ", token);
        var jwtSecret = process.env.JWTSECRET || 'CSEN603ROCKSi<8SE!';
        // console.log(jwtSecret);
        // Get JWT contents:
        try {
            var payload = jwt.verify(token, jwtSecret);
            req.payload = payload;
            next();
        } catch (err) {
            console.error('[ERROR]: JWT Error reason:', err);
            res.send('403 error');
        }
    });

    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:cabin', function(req, res) {
        mongo.searchFlights(req.params.origin, req.params.destination, req.params.departingDate, req.params.cabin, function(err, outgoingFlight) {
            mongo.searchFlights(req.params.destination, req.params.origin, req.params.returningDate, req.params.cabin, function(err, returnFlight) {
                var flights = {};
                flights.outgoingFlights = outgoingFlight;
                flights.returnFlights = returnFlight;
                res.json(flights);
            });
        });
    });

    app.get('/api/flights/search/:origin/:destination/:departingDate/:cabin', function(req, res) {
        mongo.searchFlights(req.params.origin, req.params.destination, req.params.departingDate, req.params.cabin, function(err, outgoingFlight) {
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
        mongo.seedDB();
    });

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {
      mongo.clearDB();
    });
};
