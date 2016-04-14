App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();
    
    $scope.tickets = FlightsSrv.getSelectedNumberOfTickets();
    $scope.price = OutReturnSrv.getSelectedPrice();

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

    $scope.reservation = [];

    for (var bookingRef = 1; bookingRef <= FlightsSrv.getSelectedNumberOfTickets(); bookingRef++) {
        var ticket = {};
        ticket.refNo = bookingRef;
        $scope.reservation.push(ticket);
    };

    $scope.goToPayment = function() {
        setTicketEmail($scope.typedEmail);
        setTicketPhoneNo($scope.typedPhoneNo);
        setTicketReservation($scope.reservation);
        $location.url('/payment');
    };
});
