/**
 * Flights Service
 */
App.factory('FlightsSrv', function($http) {
    return {
        getAirportCodes: function() {
            return $http.get('/api/data/airports');
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
            this.setSelectedOutDate = value;
        },
        getSelectedOutDate: function() {
            return this.setSelectedOutDate;
        },
        setSelectedReturnDate: function(value) {
            this.setSelectedReturnDate = value;
        },
        getSelectedReturnDate: function() {
            return this.setSelectedReturnDate;
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
        setSelectedNumberOfTickets: function(value) {
            this.selectedNumberOfTickets = value;
        },
        getSelectedNumberOfTickets: function() {
            return this.selectedNumberOfTickets;
        }
        
    };
});
