App.factory('BookingSrv', function($http) {
  return {
    getBookingInfo: function(Origin, Dest, rDate, Cabin, SeatNumber) {
      return $http.get('/data/flights/bookings/' + Origin + '/' + Dest + '/' + rDate + '/' + Cabin + '/' + SeatNumber);
    },

    getSelectedBookingRef: function() {
      return this.SelectedBookingRef;
    },
    setSelectedBookingRef: function(value) {
      this.SelectedBookingRef = value;
    },
    getOut: function() {
      return this.Out;
    },
    setOut: function(value) {
      this.Out = value;
    },
    getReturn: function() {
      return this.Return;
    },
    setReturn: function(value) {
      this.Return = value;
    },
    getFlight: function() {
      return this.Flight;
    },
    setFlight: function(value) {
      this.Flight = value;
    },
    getFlightOut: function() {
      return this.getFlightOut;
    },
    setFlightOut: function(value) {
      this.getFlightOut = value;
    }
  }
});
