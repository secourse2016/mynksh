App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location, BookingSrv, $http) {

    $scope.SetBookingRef = function(value) {
        BookingSrv.setSelectedBookingRef(value);
    };

    $scope.bookingref = BookingSrv.getSelectedBookingRef();

    $scope.retreiveBookingRef = function() {
      $http.get('/data/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
        $scope.flights=flight;

      });
    }

  //   if ($scope.selectedOutgoingFlight.Airline === 'IBERIA')
  //    $location.url('/seatmap/Outgoing');
  //  else if ($scope.roundTrip == 'true' && $scope.selectedReturnFlight.Airline === 'IBERIA')
  //    $location.url('/seatmap/Return');
  //  else
  //    $location.url('/confirm');

});
