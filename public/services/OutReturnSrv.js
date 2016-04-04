App.factory('OutReturnSrv', function ($http) {
     return {
				getOutgoingInfo : function() {
           			return $http.get('/api/outgoingInfo');
         	},
         		getReturnInfo : function() {
           			return $http.get('/api/returnInfo');
            },
               setSelectedFlightNumber: function(value)
            {
           	this.selectedFlightNumber = value;
            },

            setSelectedDepartureTime: function(value)
            {
           	this.selectedDepartureTime = value;
            },

            setSelectedArrivalTime: function(value)
            {
           	this.selectedArrivalTime = value;
            },

            setSelectedDuration: function(value)
            {
           	this.selectedDuration = value;
            },

            setSelectedCabin: function(value)
            {
           	this.selectedCabin = value;
            },

            setSelectedPrice: function(value)
            {
           	this.selectedPrice = value;
            },

            setSelectedOperatedBy: function(value)
            {
           	this.selectedOperatedBy = value;
            },
     };
 });
