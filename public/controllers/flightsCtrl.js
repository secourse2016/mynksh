/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv, OutReturnSrv, $location) {

    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();

    function outgoingInfo() {
        OutReturnSrv.getOutgoingInfo().success(function(outgoingInfo) {
            $scope.outgoingInfo = outgoingInfo;
        });
    };

    function returnInfo() {
        OutReturnSrv.getReturnInfo().success(function(returnInfo) {
            $scope.returnInfo = returnInfo;
        });
    };
    $scope.stringToDate = function(date) {
        return new Date(date);
    };
    $scope.timediff = function(depart, arr) {
        return moment.utc(moment(arr).diff(moment(depart))).format("hh:mm");
    };
    $scope.BookFlight = function() {
        $location.url('/confirm');
    };
    $scope.SetOutFlightNum = function(value) {
        OutReturnSrv.setSelectedOutFlightNum(value);
    };
    $scope.SetReturnFlightNum = function(value) {
        OutReturnSrv.setSelectedReturnFlightNum(value);
    };
    $scope.SetOutDepartureTime = function(value) {
        OutReturnSrv.setSelectedOutDepartureTime(value);
    };
    $scope.SetReturnDepartureTime = function(value) {
        OutReturnSrv.setSelectedReturnDepartureTime(value);
    };
    $scope.SetOutArrivalTime = function(value) {
        OutReturnSrv.setSelectedOutArrivalTime(value);
    };
    $scope.SetReturnArrivalTime = function(value) {
        OutReturnSrv.setSelectedReturnArrivalTime(value);
    };
    $scope.SetOutDuration = function(value) {
        OutReturnSrv.setSelectedOutDuration(value);
    };
    $scope.SetReturnDuration = function(value) {
        OutReturnSrv.setSelectedReturnDuration(value);
    };
    $scope.SetOutCabin = function(value) {
        OutReturnSrv.setSelectedOutCabin(value);
    };
    $scope.SetReturnCabin = function(value) {
        OutReturnSrv.setSelectedReturnCabin(value);
    };
    $scope.SetPrice = function(value) {
        OutReturnSrv.setSelectedPrice(value);
    };
    $scope.SetOutOperatedBy = function(value) {
        OutReturnSrv.setSelectedOutOperatedBy(value);
    };
    $scope.SetReturnOperatedBy = function(value) {
        OutReturnSrv.setSelectedReturnOperatedBy(value);
    };

    if ($scope.roundTrip == true) {
        $scope.returnCabin = '';
        $scope.$watch('returnCabin', function() {
            if ($scope.returnCabin == 'economy')
                $scope.returnPrice = $scope.selectedReturnFlight.eCost;
            if ($scope.returnCabin == 'business')
                $scope.returnPrice = $scope.selectedReturnFlight.bCost;
        });
    }
    $scope.outgoingCabin = '';
    $scope.$watch('outgoingCabin', function() {
        $scope.calcOut();
    }, true);
    // $scope.$watch('selectedOutgoingFlight',function() {$scope.totalPrice=$scope.selectedOutgoingFlight.eCost;});
    $scope.w = 0;
    $scope.calcOut = function() {
        if ($scope.outgoingCabin === "economy") {
            $scope.outgoingPrice = $scope.selectedReturnFlight.eCost;
        };
        if ($scope.outgoingCabin === "business") {
            $scope.outgoingPrice = $scope.selectedReturnFlight.bCost;
        };

        $scope.w++;
    };
    $scope.goCocontinuePay = function() {
        $location.url('/payment');
    };

    //   if($scope.outgoingCabin == "business")
    //    if(roundTrip == true){
    //     if($scope.returnCabin == "economy")
    //         $scope.totalPrice = $selectedOutgoingFlight.bCost + $selectedReturnFlight.eCost;
    //     else if($scope.returnCabin == "business")
    //         $scope.totalPrice = $selectedOutgoingFlight.bCost + $selectedReturnFlight.bCost;
    //     }
    //    else $scope.totalPrice = $selectedOutgoingFlight.bCost;
    // };
});
