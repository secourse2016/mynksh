App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if ($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();

    $scope.tickets= FlightsSrv.getTickets();
    $scope.price = OutReturnSrv.getSelectedPrice();
    $scope.currentDate = new Date();
    $scope.minDate = new Date($scope.currentDate.getFullYear() -100,$scope.currentDate.getMonth(),$scope.currentDate.getDate());
    $scope.maxDate = new Date($scope.currentDate.getFullYear() +5,$scope.currentDate.getMonth(),$scope.currentDate.getDate());
    $scope.reservations = [];

    for(var i=0 ; i<$scope.tickets ; i++){
        $scope.reservations[i] = {};
        $scope.reservations[i].dateOfBirth = new Date();
        $scope.reservations[i].passportExpiryDate = new Date();
    };

    var setTicketReservations = function(value) {
        ConfirmSrv.setReservations(value);
    };

    $scope.goToPayment = function() {
        setTicketReservations($scope.reservations);
        $location.url('/payment');
    };
});
