/*
 * Main Controller
 */
App.controller('landingCtrl', function($scope, FlightsSrv, $location, $timeout, $q) {

  /*----------- Angular Bootstrap Datepicker -----------*/
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.pinging = "false";
  $scope.roundTrip = "true";
  $scope.cabin = "true";
  $scope.data = {
    showDelete: false,
    showCabin: true,
    showPinging: false
  };


  // list of `state` value/display objects
  $scope.states = [];
  loadAll();
  $scope.querySearch = querySearch;


  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? $scope.states.filter(createFilterFor(query)) : $scope.states,
      deferred;
      deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;

  };



  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    AirportCodes(function(allStates) {
      return allStates.map(function(state) {
        $scope.states.push({
          value: state.iata.toLowerCase(),
          display: state.name
        });
      });
    });

  };

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };

  };

  $scope.bookingRef = function() {
    $location.url('/bookingRef');
  };


  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.SetSelectedOutDate = function(year, month, day) {
    $scope.dto = new Date(year, month, day);
  };
  $scope.SetSelectedReturnDate = function(year, month, day) {
    $scope.dtr = new Date(year, month, day);

  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  /*----------- Angular Bootstrap Typeahead -----------*/

  /* Retrieve List of Airports Codes */
  function AirportCodes(cb) {
    FlightsSrv.getAirportCodes().success(function(airports) {
      $scope.Airports = airports;
      cb(airports);
    });
  };

  /* Record User's Selected Origin Airport  */
  $scope.SetOriginAirport = function(originAirport) {
    FlightsSrv.setSelectedOriginAirport(originAirport.toUpperCase());
  };

  $scope.SetDestinationAirport = function(destAirport) {
    FlightsSrv.setSelectedDestinationAirport(destAirport.toUpperCase());
  };

  $scope.SetOutDate = function(value) {
    FlightsSrv.setSelectedOutDate(value);
  };
  $scope.SetReturnDate = function(value) {
    FlightsSrv.setSelectedReturnDate(value);
  };
  $scope.SetRoundTrip = function(value) {
    FlightsSrv.setSelectedRoundTrip(value);
  };
  $scope.SetCabin = function(value) {
    FlightsSrv.setSelectedCabin(value);
  };
  $scope.SetPinging = function(value) {
    FlightsSrv.setPinging(value);
  };

  /* Find All Available Flights  */
  $scope.SearchFlights = function() {
    $location.url('/flights');
  };

  /* Get Airports on page render  */

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY
    mondayFirst: false,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    startDate: new Date(2016, 03, 03),
    endDate: new Date(2024, 1, 26),
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
  };
  $scope.onezoneDatepicker2 = {
    date: new Date(), // MANDATORY
    mondayFirst: false,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    startDate: new Date(2016, 03, 03),
    endDate: new Date(2024, 1, 26),
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,


  };

});
