App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location, $http) {

    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    $scope.outgoingPrice = 0;
    $scope.returnPrice = 0;
    $scope.cabin = FlightsSrv.getSelectedCabin();
    $scope.outFlightFound=true;
    $scope.returnFlightFound= true;

    var flights = [];
    flights.outgoingFlights = [];
    flights.returnFlights = [];

    function pingAirlineR(origin, dest, oDate, rDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            $scope.outgoingInfo = flights.outgoingFlights;
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(departDate).toDate().getTime();
                var outDate = moment(oDate).toDate().getTime();
                $http.get(c.ip + '/api/flights/search/' + origin + '/' + dest + '/' + departDate + '/' + outDate + '/' + tclass).success(function(flight) {
                    flights.outgoingFlights.push(flight.outgoingFlights);
                    flights.returnFlights.push(flight.returnFlights);

                });
            });
        });
    }

    // pingAirlineS('CAI', 'JED', 'April 13, 1995');

    function pingAirlineS(origin, dest, oDate) {
        OutReturnSrv.getairLinesInfo().success(function(airlines) {
            $scope.outgoingInfo = flights.outgoingFlights;
            airlines.forEach(function(c) {
                var tclass = ($scope.cabin === "true") ? "economy" : "business";
                var departDate = moment(oDate).toDate().getTime();
                $http.get('/api/flights/search/' + origin + '/' + dest + '/' + departDate + '/' + tclass).success(function(flight) {
                    flights.outgoingFlights.push(flight.outgoingFlights);
                    console.log(flight.outgoingFlights);
                });
            });
        });
    }


    function roundTripInfo(origin, dest, oDate, rDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "economy").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                $scope.returnInfo = flights.returnFlights;
                // if(Object.keys(outgoingFlight).length === 0 || Object.keys(returnFlight).length === 0 )
                //     res.send("no flights found");
                if($scope.outgoingInfo.length === 0){
                     console.log("outgoing empty");
                    $scope.outFlightFound= false;
                }
                if($scope.returnInfo.length === 0){
                     console.log("outgoing empty");
                    $scope.returnFlightFound= false;
                }

            });
        } else {
            OutReturnSrv.getRoundTripInfo(origin, dest, oDate, rDate, "business").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                $scope.returnInfo = flights.returnFlights;
                if($scope.outgoingInfo.length === 0){
                    console.log("outgoing empty");
                    $scope.outFlightFound= false;
                }
                if($scope.returnInfo.length === 0){
                    console.log("outgoing empty");
                    $scope.returnFlightFound= false;
                }

            });
        }
    };


    function oneWayTripInfo(origin, dest, oDate) {
        if ($scope.cabin === "true") {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "economy").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                if($scope.outgoingInfo.length === 0)
                    $scope.outFlightFound= false;
            });
        } else {
            OutReturnSrv.getOneWayTripInfo(origin, dest, oDate, "business").success(function(flights) {
                $scope.outgoingInfo = flights.outgoingFlights;
                if($scope.outgoingInfo.length === 0)
                    $scope.outFlightFound= false;
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
