App.factory('OutReturnSrv', function($http) {
    return {
        getOutgoingInfo: function() {
            return $http.get('/api/outgoingInfo');
        },
        getReturnInfo: function() {
            return $http.get('/api/returnInfo');
        },
        setSelectedOutFlightNum: function(value) {
            this.selectedOutFlightNum = value;
        },

        setSelectedReturnFlightNum: function(value) {
            this.selectedReturnFlightNum = value;
        },

        setSelectedOutDepartureTime: function(value) {
            this.selectedOutDepartureTime = value;
        },
        setSelectedReturnDepartureTime: function(value) {
            this.selectedReturnDepartureTime = value;
        },

        setSelectedOutArrivalTime: function(value) {
            this.selectedOutArrivalTime = value;
        },
        setSelectedReturnArrivalTime: function(value) {
            this.selectedReturnArrivalTime = value;
        },

        setSelectedOutDuration: function(value) {
            this.selectedOutDuration = value;
        },
        setSelectedReturnDuration: function(value) {
            this.selectedReturnDuration = value;
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
    };
});
