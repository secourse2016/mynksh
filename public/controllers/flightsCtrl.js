App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location) {

    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    $scope.outgoingPrice = 0;
    $scope.returnPrice = 0;
    $scope.cabin = FlightsSrv.getSelectedCabin();


    function roundTripInfo(origin, dest, oDate, rDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "economy").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                $scope.returnInfo = flights.returnFlights;

            });
        } else {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "business").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                $scope.returnInfo = flights.returnFlights;

            });
        }
    };


    function oneWayTripInfo(origin, dest, oDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "economy").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
            });
        } else {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "business").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
            });
        }

    };

    function changeISOFormat(date) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date(date);
        return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    };

    if ($scope.roundTrip === 'true')
        roundTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate));
    else
        oneWayTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate));

    $scope.stringToDate = function(date) {
        return new Date(date);
    };
    $scope.timediff = function(depart, arr) {
        return moment.utc(moment(arr).diff(moment(depart))).format("hh:mm");
    };


    $scope.BookFlight = function() {
        if ($scope.selectedOutgoingFlight == null) {
            $scope.RadioSelected = true;
            return;
        } else
            $scope.RadioSelected = false;

        if ($scope.roundTrip == 'true') {
            if ($scope.selectedReturnFlight == null) {
                $scope.RadioSelected = true;
                return;
            } else
                $scope.RadioSelected = false;
        }

        OutReturnSrv.setSelectedOutFlight($scope.selectedOutgoingFlight);
        if ($scope.roundTrip == 'true') {
            OutReturnSrv.setSelectedReturnFlight($scope.selectedReturnFlight);
            OutReturnSrv.setSelectedPrice($scope.selectedOutgoingFlight.cost + $scope.selectedReturnFlight.cost);
        } else
            OutReturnSrv.setSelectedPrice($scope.selectedOutgoingFlight.cost);

        $location.url('/confirm');

    };

});
