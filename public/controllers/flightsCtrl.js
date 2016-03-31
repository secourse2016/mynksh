/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv) {

  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };

});
