/* Create Angular App Instance */
app = angular.module('SE_L10', ['ionic']);

/**
 * Angular Routes
 */
app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                templateUrl: '/partials/main.html',
                controller: 'mainCtrl'
            })

            .state('test', {
                url: '/test',
                templateUrl: '/partials/test.html',
                controller: 'mainCtrl'
            })

            .state('flights', {
                url: '/flights',
                templateUrl: '/partials/flights.html',
                controller: 'flightsCtrl'
            });

        $urlRouterProvider.otherwise('/#');

});


/**
 * Main Controller
 */
app.controller('mainCtrl', function($scope, $state, FlightsSrv) {

  /* Retrieve List of Airports Codes */
  function AirportCodes() {
    FlightsSrv.getAirportCodes().success(function(airports) {
        console.log('[airports codes=>', airports);
         $scope.Airports = airports;
     });
  };

  /* Record User's Selected Origin Airport  */
  SetOriginAirport = function(originAirport) {
    console.log("[originAirport]=>", originAirport);
    FlightsSrv.setSelectedOriginAirport(originAirport);
  };

  /* Record User's Selected Destination Airport  */
  SetDestinationAirport = function(destinationAirport) {
    console.log("[destAirport]=>", destinationAirport);
    FlightsSrv.setSelectedDestinationAirport(destinationAirport);
  };

  /* Find All Available Flights  */
  $scope.SearchFlights = function(origin, destination) {
    SetOriginAirport(origin);
    SetDestinationAirport(destination);
    $state.go('flights');
  };

  /* Get Airports on page render  */
  AirportCodes();

});



/**
 * Flights Controller
 */
app.controller('flightsCtrl', function($scope, FlightsSrv) {

  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };

});


/**
 * Flights Service
 */
app.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
            console.log('[flightsSrv]=>getAirportCodes');
           return $http.get('http://localhost/data/airports');
         },
         setSelectedOriginAirport: function(value) {
           this.selectedOriginAirport = value;
         },
         getSelectedOriginAirport: function() {
           return this.selectedOriginAirport;
         },
         setSelectedDestinationAirport: function(value) {
           this.selectedDestinationAirport = value;
         },
         getSelectedDestinationAirport: function() {
           return this.selectedDestinationAirport;
         }
     };
 });
