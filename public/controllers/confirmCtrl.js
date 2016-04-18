App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if ($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();

    $scope.price = OutReturnSrv.getSelectedPrice();
    $scope.currentDate = new Date();

    $scope.format = 'd/M/yyyy'

    var setTicketReservation = function(value) {
        ConfirmSrv.setReservation(value);
    };
    $scope.isGreaterThanTickets = function(num) {
        return num < $scope.number;
    };

    $scope.reservation = [];

    $scope.goToPayment = function() {
        setTicketReservation($scope.reservation);
        $location.url('/payment');
    };
});