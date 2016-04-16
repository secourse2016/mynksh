App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location) {

  $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
  $scope.origin = FlightsSrv.getSelectedOriginAirport();
  $scope.dest = FlightsSrv.getSelectedDestinationAirport();
  $scope.oDate = FlightsSrv.getSelectedOutDate();
  $scope.rDate = FlightsSrv.getSelectedReturnDate();
  $scope.tickets = FlightsSrv.getSelectedNumberOfTickets();
  $scope.outgoingPrice = 0;
  $scope.returnPrice = 0;

    function roundTripInfo(origin,dest,oDate,rDate) {
        OutReturnSrv.getRoundTripInfo(origin,dest,oDate,rDate).success(function(flights) {
            $scope.outgoingInfo = flights.outgoingFlight;
            $scope.returnInfo = flights.returnFlight;
        });
    };

    function oneWayTripInfo(origin,dest,oDate) {
        OutReturnSrv.getOneWayTripInfo(origin,dest,oDate).success(function(flights) {
            $scope.outgoingInfo = flights.outgoingFlight;
        });
    };

    if($scope.roundTrip === true)
      roundTripInfo($scope.origin,$scope.dest,$scope.oDate,$scope.rDate);
    else
      oneWayTripInfo($scope.origin,$scope.dest,$scope.oDate);

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

        if ($scope.outgoingCabin == null) {
            $scope.OutgoingPriceSelected = true;
            return;
        } else
            $scope.OutgoingPriceSelected = false;

        if ($scope.roundTrip == 'true') {
            if ($scope.selectedReturnFlight == null) {
                $scope.RadioSelected = true;
                return;
            } else
                $scope.RadioSelected = false;

            if ($scope.returnCabin == null) {
                $scope.ReturnPriceSelected = true;
                return;
            } else
                $scope.ReturnPriceSelected = false;
        }

        OutReturnSrv.setSelectedOutFlight($scope.selectedOutgoingFlight);
        OutReturnSrv.setSelectedOutOperatedBy('iberia');
        OutReturnSrv.setSelectedOutCabin($scope.outgoingCabin);
        if ($scope.roundTrip == 'true') {
            OutReturnSrv.setSelectedReturnFlight($scope.selectedReturnFlight);
            OutReturnSrv.setSelectedReturnOperatedBy('iberia');
            OutReturnSrv.setSelectedReturnCabin($scope.returnCabin);
            OutReturnSrv.setSelectedPrice(($scope.outgoingPrice + $scope.returnPrice) * $scope.tickets);
        } else
            OutReturnSrv.setSelectedPrice($scope.outgoingPrice * $scope.tickets);

        $location.url('/confirm');

    };

    $scope.angular = angular;

    //calculating the price

    $scope.$watch('outgoingCabin', function() {
        $scope.calculateOutgoingPrice();
    }, true);
    $scope.$watch('selectedOutgoingFlight', function() {
        $scope.calculateOutgoingPrice();
    }, true);
    $scope.$watch('selectedReturnFlight', function() {
        $scope.calculateReturningPrice();
    }, true);
    $scope.$watch('returnCabin', function() {
        $scope.calculateReturningPrice();
    }, true);

    $scope.calculateOutgoingPrice = function() {
        if ($scope.outgoingCabin === "economy") {
            $scope.outgoingPrice = $scope.selectedOutgoingFlight.eCost;
        };
        if ($scope.outgoingCabin === "business") {
            $scope.outgoingPrice = $scope.selectedOutgoingFlight.bCost;
        };
    };

    $scope.calculateReturningPrice = function() {
        if ($scope.returnCabin === "economy") {
            $scope.returnPrice = $scope.selectedReturnFlight.eCost;
        };
        if ($scope.returnCabin === "business") {
            $scope.returnPrice = $scope.selectedReturnFlight.bCost;
        };
    };

});
