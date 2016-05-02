App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if ($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();

    $scope.tickets = 1;
    // $scope.tickets= 2;
    $scope.price = OutReturnSrv.getSelectedPrice();
    $scope.currentDate = new Date();
    $scope.reservation = {};
    $scope.reservation.issueDate = new Date();
    $scope.reservation.expiryDate = new Date();
    $scope.minDate = new Date($scope.currentDate.getFullYear() -5,$scope.currentDate.getMonth(),$scope.currentDate.getDate());
    $scope.maxDate = new Date($scope.currentDate.getFullYear() +5,$scope.currentDate.getMonth(),$scope.currentDate.getDate());

    var setTicketEmail = function(value) {
        ConfirmSrv.setEmail(value);
    };

    var setTicketPhoneNo = function(value) {
        ConfirmSrv.setPhoneNo(value);
    };

    var setTicketReservation = function(value) {
        ConfirmSrv.setReservation(value);
    };
    $scope.isGreaterThanTickets = function(num) {
        return num < $scope.number;
    };

    $scope.goToPayment = function() {
        setTicketPhoneNo($scope.typedPhoneno);
        setTicketEmail($scope.typedEmail);
        setTicketReservation($scope.reservation);
        $location.url('/payment');
    };
});
