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
    $scope.seats = FlightsSrv.getTickets();

    if (FlightsSrv.getPinging().toString() === 'true')
        if ($scope.roundTrip === 'true')
            pingAirlineR($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate),$scope.seats);
        else
            pingAirlineS($scope.origin, $scope.dest, changeISOFormat($scope.oDate), $scope.seats);

    if ($scope.roundTrip === 'true')
        roundTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate), changeISOFormat($scope.rDate),$scope.seats);
    else
        oneWayTripInfo($scope.origin, $scope.dest, changeISOFormat($scope.oDate), $scope.seats);

    // var flights = [];
    // flights.outgoingFlights = [];
    // flights.returnFlights = [];

    function pingAirlineR(origin, dest, oDate, rDate, seats) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(oDate).toDate().getTime();
                var outDate = moment(oDate).toDate().getTime();
                var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get('/api/others/search/'+ c.ip + '/' + origin + '/' + dest + '/' + departDate + '/' + outDate + '/' + tclass +'/' + seats + '/' + jwt).success(function(flight) {
                  console.log(flight);
                    if (flight.outgoingFlights != undefined && flight.outgoingFlights[0] != undefined) {
                        flight.outgoingFlights[0].cost = Number(flight.outgoingFlights[0].cost);
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    }
                    if (flight.returnFlights != undefined && flight.returnFlights[0] != undefined) {
                        flight.returnFlights[0].cost = Number(flight.returnFlights[0].cost);
                        $scope.returnInfo.push(flight.returnFlights[0]);
                    }
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };

    function pingAirlineS(origin, dest, oDate, seats) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(oDate).toDate().getTime();
                jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
                $http.get('/api/others/search/' + c.ip + '/' + origin + '/' + dest + '/' + departDate + '/' + tclass +'/' + seats + '/' + jwt).success(function(flight) {
                    if (flight.outgoingFlights != undefined && flight.outgoingFlights[0] != undefined) {
                        flight.outgoingFlights[0].cost = Number(flight.outgoingFlights[0].cost);
                        $scope.outgoingInfo.push(flight.outgoingFlights[0]);
                    }
                    // console.log(flight.outgoingFlights);
                });
            });
        });
    };


    function roundTripInfo(origin, dest, oDate, rDate, seats) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "economy", seats).success(function(flights) {
                if (flights.outgoingFlights[0] != undefined)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if (flights.returnFlights[0] != undefined)
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
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "business", seats).success(function(flights) {
                if (flights.outgoingFlights[0] != undefined)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if (flights.returnFlights[0] != undefined)
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


    function oneWayTripInfo(origin, dest, oDate,seats) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "economy", seats).success(function(flights) {
                if (flights.outgoingFlights[0] != undefined)
                    $scope.outgoingInfo.push(flights.outgoingFlights[0]);
                if ($scope.outgoingInfo.length === 0)
                    $scope.outFlightFound = false;
            });
        } else {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "business", seats).success(function(flights) {
                if (flights.outgoingFlights[0] != undefined)
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

        OutReturnSrv.setSelectedOutFlight($scope.selectedOutgoingFlight * $scope.seats);
        if ($scope.roundTrip == 'true') {
            OutReturnSrv.setSelectedReturnFlight($scope.selectedReturnFlight * $scope.seats);
            OutReturnSrv.setSelectedPrice(($scope.selectedOutgoingFlight.cost + $scope.selectedReturnFlight.cost) * $scope.seats);
        } else
            OutReturnSrv.setSelectedPrice($scope.selectedOutgoingFlight.cost * $scope.seats);

        $location.url('/confirm');
    };

});
