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
      if (flight.length != 0) {
        for (var i = 0; i < flight.length; i++) {
          if (flight[i].way === "outgoing")
            outTickets.push(flight[i]);
          else {
            returnTickets.push(flight[i]);
          }
        }
        BookingSrv.setOut(outTickets);
        BookingSrv.setReturn(returnTickets);
        BookingSrv.setFlight(flight[0].flightNumber);
        BookingSrv.setFlightOut(flight[flight.length - 1].flightNumber);
      }
      else{
        $scope.showme = false;
        alert("Booking Ref not found");
      }
    });
  }

  $scope.goToSeats = function() {
    $location.url('/seatmap/Outgoing');
  }

});
App.filter('unique', function() {
  return function(collection, keyname) {
    var output = [],
      keys = [];

    angular.forEach(collection, function(item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });

    return output;
  };
});
