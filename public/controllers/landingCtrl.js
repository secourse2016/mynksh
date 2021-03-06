/*
 * Main Controller
 */
App.controller('landingCtrl', function($scope, FlightsSrv, $location) {

    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    //   $scope.$watch('dt1',function(val){
    //    //to do
    //    console.log(val)
    // });

    // $scope.originOffer1="N/A";
    // $scope.destOffer1="N/A";
    $scope.roundTripOff1="false";
    $scope.cabinOff1="false";
    $scope.pingOff1="false";
    // $scope.dtoOff1=new Date();
    // $scope.dtrOff1=new Date();

    $scope.pinging="false";
    $scope.roundTrip = "true";
    $scope.cabin = "true";
    $scope.ticket = 1;

    $scope.bookingRef = function() {
        $location.url('/bookingRef');
    };

    $scope.teamMembers = function() {
      $location.url('/teamMembers');
    };


    // $scope.cabin="cabin";

    // $scope.roundTrip="roundtrip";
    $scope.isShown = function(roundTrip) {
        return roundTrip === $scope.roundTrip;
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
    $scope.SetSelectedOutDate = function(year, month, day) {
        $scope.dtoOff1 = new Date(year, month, day);
    };
    $scope.SetSelectedReturnDate = function(year, month, day) {
        $scope.dtrOff1 = new Date(year, month, day);

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
    $scope.setTickets = function (value){
      FlightsSrv.setTickets(value);
    };

    $scope.SetOriginAirport = function(originAirport) {
        FlightsSrv.setSelectedOriginAirport(originAirport);
    };

    $scope.SetDestinationAirport = function(destAirport) {
        FlightsSrv.setSelectedDestinationAirport(destAirport);
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
        $scope.setTickets($scope.ticket);
        $location.url('/flights');
    };

    /* Get Airports on page render  */
    AirportCodes();

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

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    };
});
