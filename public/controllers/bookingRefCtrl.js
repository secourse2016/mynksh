App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location, BookingSrv, $http) {

  $scope.SetBookingRef = function(value) {
    BookingSrv.setSelectedBookingRef(value);
  };

  $scope.bookingref = BookingSrv.getSelectedBookingRef();

  $scope.retreiveBookingRef = function() {
    $http.get('/data/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
      $scope.flights = flight;
      var outTickets = [];
      var returnTickets = [];
      for (var i = 0; i < flight.length; i++) {
        if (flight[i].way === "outgoing")
          outTickets.push(flight[i]);
        else
          returnTickets.push(flight[i]);
      }
      BookingSrv.setOut(outTickets);
      BookingSrv.setReturn(returnTickets);
      BookingSrv.setFlight(flight[0].flightNumber);

    });
  }

  $scope.goToSeats = function() {
       $location.url('/seatmap/Outgoing');
  }

});
