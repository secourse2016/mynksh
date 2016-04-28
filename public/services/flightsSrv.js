/**
 * Flights Service
 */
App.factory('FlightsSrv', function($http) {
    return {
        getPayment: function(firstName, lastName, passportNum, passportExpiryDate, dateOfBirth, nationality, email) {
            var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
            var path = '/booking' + firstName + '/' + lastName + '/' + passportNum + '/' + passportExpiryDate + '/' + dateOfBirth + '/' + nationality + '/' + email + '/' + '?wt=' + jwt;
            return $http.get(path);
        },
        getAirportCodes: function() {
            return $http.get('/data/airports');
        },
        setSelectedOriginAirport: function(value) {
            this.selectedOriginAirport = value;
        },
        getSelectedOriginAirport: function() {
            return this.selectedOriginAirport;
        },
        setSelectedDestinationAirport: function(value) {
            this.selectedDestinationAirport = value;
        },
        getSelectedDestinationAirport: function() {
            return this.selectedDestinationAirport;
        },
        setSelectedOutDate: function(value) {
            this.selectedOutDate = value;
        },
        getSelectedOutDate: function() {
            return this.selectedOutDate;
        },
        setSelectedReturnDate: function(value) {
            this.selectedReturnDate = value;
        },
        getSelectedReturnDate: function() {
            return this.selectedReturnDate;
        },
        setSelectedRoundTrip: function(value) {
            this.selectedRoundTrip = value;
        },
        getSelectedRoundTrip: function() {
            return this.selectedRoundTrip;
        },
        setSelectedCabin: function(value) {
            this.selectedCabin = value;
        },
        getSelectedCabin: function() {
            return this.selectedCabin;
        },
        setPinging: function(value) {
            this.selectedPinging = value;
        },
        getPinging: function() {
            return this.selectedPinging;
        }

    };
});
