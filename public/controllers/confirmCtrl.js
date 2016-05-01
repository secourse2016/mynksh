App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if ($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();

    $scope.tickets = 2;
    $scope.price = OutReturnSrv.getSelectedPrice();
    $scope.currentDate = new Date();
    //to be copied in ionic
    $scope.reservations = [];

    for(var i=1 ; i<=$scope.tickets ; i++){
      $scope.reservations[i-1]= {'number':i};
    };
    //end of copy
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
