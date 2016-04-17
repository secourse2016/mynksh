App.factory('OutReturnSrv', function($http) {
    return {
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

        setSelectedOutOperatedBy: function(value) {
            this.selectedOutOperatedBy = value;
        },
        setSelectedReturnOperatedBy: function(value) {
            this.selectedReturnOperatedBy = value;
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
        },

        getSelectedOutOperatedBy: function() {
            return this.selectedOutOperatedBy;
        },
        getSelectedReturnOperatedBy: function() {
            return this.selectedReturnOperatedBy;
        },
    };
});
