App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if ($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();

    $scope.tickets = FlightsSrv.getTickets();
    $scope.price = OutReturnSrv.getSelectedPrice();
    $scope.currentDate = new Date();
    $scope.reservations = [];

    for(var i=0 ; i<$scope.tickets ; i++){
      $scope.reservations[i]= {};
    };
    var setTicketReservations = function(value) {
        ConfirmSrv.setReservations(value);
    };
    $scope.isGreaterThanTickets = function(num) {
        return num < $scope.number;
    };

    $scope.goToPayment = function() {
        setTicketReservations($scope.reservations);
        $location.url('/payment');
    };
});
