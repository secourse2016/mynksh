App.factory('OutReturnSrv', function($http) {
    return {
        getOutgoingInfo: function() {
            return $http.get('/api/outgoingInfo');
        },
        getReturnInfo: function() {
            return $http.get('/api/returnInfo');
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