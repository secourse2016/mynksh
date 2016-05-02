App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location, $http) {

    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    $scope.outgoingPrice = 0;
    $scope.returnPrice = 0;
    $scope.cabin = FlightsSrv.getSelectedCabin();
    $scope.outFlightFound = true;
    $scope.returnFlightFound = true;
    $scope.outgoingInfo = [];
    $scope.returnInfo = [];

    if (FlightsSrv.getPinging().toString() === 'true')
        if ($scope.roundTrip === 'true')
            pingAirlineR($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate));
        else
            pingAirlineS($scope.origin, $scope.dest, changeISOFormat($scope.oDate));

    if ($scope.roundTrip === 'true')
        roundTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate));
    else
        oneWayTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate));


    function pingAirlineR(origin, dest, oDate, rDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(oDate).toDate().getTime();
                var outDate = moment(oDate).toDate().getTime();
                var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get('/api/others/search/'+ c.ip + '/' + origin + '/' + dest + '/' + departDate + '/' + outDate + '/' + tclass + '/' + jwt).success(function(flight) {
                    if (flight != undefined && flight.outgoingFlights != undefined && flight.outgoingFlights[0] != undefined) {
                        flight.outgoingFlights[0].cost = Number(flight.outgoingFlights[0].cost);
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    }
                    if (flight != undefined && flight.returnFlights != undefined && flight.returnFlights[0] != undefined) {
                        flight.returnFlights[0].cost = Number(flight.returnFlights[0].cost);
                        $scope.returnInfo.push(flight.returnFlights[0]);
                    }
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };

    function pingAirlineS(origin, dest, oDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(oDate).toDate().getTime();
                jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get('/api/others/search/' + c.ip + '/' + origin + '/' + dest + '/' + departDate + '/' + tclass + '/' + jwt).success(function(flight) {
                    if (flight != undefined && flight.outgoingFlights != undefined && flight.outgoingFlights[0] != undefined) {
                        flight.outgoingFlights[0].cost = Number(flight.outgoingFlights[0].cost);
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    }
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };


    function roundTripInfo(origin, dest, oDate, rDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "economy").success(function(flights) {
                if (flights.outgoingFlights[0] != undefined && flights.outgoingFlights[0].length != 0)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if (flights.returnFlights[0] != undefined && flights.returnFlights[0].length != 0)
                    $scope.returnInfo.push(flights.returnFlights[0]);
                // if(Object.keys(outgoingFlight).length === 0 || Object.keys(returnFlight).length === 0 )
                //     res.send("no flights found");
                if ($scope.outgoingInfo.length === 0) {
                    $scope.outFlightFound = false;
                }
                if ($scope.returnInfo.length === 0) {
                    $scope.returnFlightFound = false;
                }

            });
        } else {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "business").success(function(flights) {
                if (flights.outgoingFlights[0] != undefined && flights.outgoingFlights[0].length != 0)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if (flights.returnFlights[0] != undefined && flights.returnFlights[0].length != 0)
                    $scope.returnInfo.push(flights.returnFlights[0]);
                if ($scope.outgoingInfo.length === 0) {
                    $scope.outFlightFound = false;
                }
                if ($scope.returnInfo.length === 0) {
                    $scope.returnFlightFound = false;
                }

            });
        }
    };


    function oneWayTripInfo(origin, dest, oDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "economy").success(function(flights) {
                if (flights.outgoingFlights[0] != undefined && flights.outgoingFlights[0].length != 0)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if ($scope.outgoingInfo.length === 0)
                    $scope.outFlightFound = false;
            });
        } else {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "business").success(function(flights) {
                if (flights.outgoingFlights[0] != undefined && flights.outgoingFlights[0].length != 0)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if ($scope.outgoingInfo.length === 0)
                    $scope.outFlightFound = false;
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
