App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location, $http) {

    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    $scope.outgoingPrice = 0;
    $scope.returnPrice = 0;
    $scope.cabin = FlightsSrv.getSelectedCabin();

    if ($scope.roundTrip === 'true')
        pingAirlineR($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate));
    else
        pingAirlineS($scope.origin, $scope.dest, changeISOFormat($scope.oDate));

    if ($scope.roundTrip === 'true')
        roundTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate));
    else
        oneWayTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate));

    var flights = [];
    flights.outgoingFlights = [];
    flights.returnFlights = [];

    function pingAirlineR(origin, dest, oDate, rDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            $scope.outgoingInfo = flights.outgoingFlights;
            $scope.returnInfo = flights.returnFlights;
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "bussniess";
                var departDate = moment(oDate).toDate().getTime();
                var outDate = moment(oDate).toDate().getTime();
                jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get(c.ip + '/api/flights/search/' + origin + '/' + dest + '/' + departDate + '/' + outDate + '/' + tclass + '?wt=' + jwt).success(function(flight) {
                    if (flight.outgoingFlights[0] != 'undefined' && flight.outgoingFlights[0].length != 0)
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    if (flight.returnFlights[0] != 'undefined' && flight.returnFlights[0].length != 0)
                        $scope.returnInfo.push(flight.returnFlights[0]);
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };

    function pingAirlineS(origin, dest, oDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            $scope.outgoingInfo = flights.outgoingFlights;
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "bussniess";
                var departDate = moment(oDate).toDate().getTime();
                jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get(c.ip + '/api/flights/search/' + origin + '/' + dest + '/' + departDate + '/' + tclass + '?wt=' + jwt).success(function(flight) {
                    if (flight.outgoingFlights[0] != 'undefined' && flight.outgoingFlights[0].length != 0)
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };


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
