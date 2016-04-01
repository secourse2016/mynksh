/*
 * Main Controller
 */
App.controller('landingCtrl', function($scope, FlightsSrv, $location) {

  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.roundTrip = "true";
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  /*----------- Angular Bootstrap Typeahead -----------*/

  /* Retrieve List of Airports Codes */
  function AirportCodes() {
    FlightsSrv.getAirportCodes().success(function(airports) {
         $scope.Airports = airports;
     });
  };

  /* Record User's Selected Origin Airport  */
  $scope.SetOriginAirport = function(originAirport) {
    FlightsSrv.setSelectedOriginAirport(originAirport);
  };

  $scope.SetDestinationAirport = function(destAirport) {
    FlightsSrv.setSelectedDestinationAirport(destAirport);
  };

  $scope.SetSelectedOutDate = function(value) {
           FlightsSrv.setSelectedOutDate(value);
  };
  $scope.SetSelectedReturnDate = function(value) {
           FlightsSrv.setSelectedReturnDate(value);
  };
  $scope.SetSelectedRoundTrip = function(value) {
           FlightsSrv.setSelectedRoundTrip(value);
  };
  $scope.SetSelectedNumberOfTickets = function(value) {
           FlightsSrv.setSelectedNumberOfTickets(value);
  };
  
  /* Find All Available Flights  */
  $scope.SearchFlights = function() {
    $location.url('/flights');
  };

  /* Get Airports on page render  */
  AirportCodes();

});
