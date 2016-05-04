App.factory('OutReturnSrv', function($http) {
    return {
        getairLinesInfo: function() {
            return $http.get('/data/airlines');
        },
        getRoundTripInfo: function(origin, dest, oDate, rDate, cabin, seats) {
            var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
            var path = '/api/flights/search/' + origin + '/' + dest + '/' + oDate + '/' + rDate + '/' + cabin + '/' + seats + '?wt=' + jwt;
            return $http.get(path);
        },
        getOneWayTripInfo: function(origin, dest, oDate, cabin, seats) {
            var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
            var path = '/api/flights/search/' + origin + '/' + dest + '/' + oDate + '/' + cabin + '/' + seats + '?wt=' + jwt;
            return $http.get(path);
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

        setSelectedOutgoingSeat: function(value) {
            this.selectedOutgoingSeat = value;
        },

        setSelectedReturnSeat: function(value) {
            this.selectedReturnSeat = value;
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

        getSelectedOutgoingSeat: function() {
            return this.selectedOutgoingSeat;
        },

        getSelectedReturnSeat: function(value) {
            return this.selectedReturnSeat;
        }

    };
});
