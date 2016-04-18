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
