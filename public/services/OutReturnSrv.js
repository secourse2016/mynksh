App.factory('OutReturnSrv', function($http) {
    return {
        getairLinesInfo: function() {
            return $http.get('/api/data/airlines');
        },
        getRoundTripInfo: function(origin, dest, oDate, rDate, cabin) {
            return $http.get('/api/flights/search/' + origin + '/' + dest + '/' + oDate + '/' + rDate + '/' + cabin);
        },
        getOneWayTripInfo: function(origin, dest, oDate, cabin) {
            return $http.get('/api/flights/search/' + origin + '/' + dest + '/' + oDate + '/' + cabin);
        },
        setSelectedOutFlight: function(value) {
            this.selectedOutFlight = value;
        },

        setSelectedReturnFlight: function(value) {
            this.selectedReturnFlight = value;
        },

        setSelectedOutCabin: function(value) {
            this.selectedOutCabin = value;
        },
        setSelectedReturnCabin: function(value) {
            this.selectedReturnCabin = value;
        },

        setSelectedPrice: function(value) {
            this.selectedPrice = value;
        },

        getSelectedOutFlight: function() {
            return this.selectedOutFlight;
        },

        getSelectedReturnFlight: function() {
            return this.selectedReturnFlight;
        },

        getSelectedOutCabin: function() {
            return this.selectedOutCabin;
        },
        getSelectedReturnCabin: function() {
            return this.selectedReturnCabin;
        },

        getSelectedPrice: function() {
            return this.selectedPrice;
        }

    };
});
