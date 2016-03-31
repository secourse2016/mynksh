var app = require('./app');
var http = require('http');
var db = require('./db.js');

db.connect(function(err) {
	console.log('connected to db');
	db.seed(null,function() {
		console.log('seeded db');
		app.listen(3000, function() {
			console.log('app listening on port 3000!');
		})
	})
})
