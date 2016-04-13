App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    $scope.selectedOutgoingFlight = OutReturnSrv.getSelectedOutFlight();
    $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
    if($scope.roundTrip === 'true')
        $scope.selectedReturnFlight = OutReturnSrv.getSelectedReturnFlight();
    
    $scope.tickets = FlightsSrv.getSelectedNumberOfTickets();
    $scope.price = OutReturnSrv.getSelectedPrice();

    $scope.setTicketEmail = function(value) {
        ConfirmSrv.setEmail(value);
    };

    $scope.setTicketPhoneNo = function(value) {
        ConfirmSrv.setPhoneNo(value);
    };

    $scope.setTicketReservation = function(value) {
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

        if($scope.typedPhoneno==null){
            $scope.PhoneNoShow=true;
            return ;
        }
        else
            $scope.PhoneNoShow=false;

        setTicketPhoneNo($scope.typedPhoneno);

        if($scope.typedEmail==null){
            $scope.EmailShow=true;
            return ; 
        }
        else
            $scope.EmailShow=false;
        
        setTicketEmail($scope.typedEmail);
        
        for (var x = 1; x <= FlightsSrv.getSelectedNumberOfTickets(); x++) {
        if($scope.reservation[x-1].FName==null){
            $scope.FNameShow=true;
            return ;
        }
        else
            $scope.FNameShow=false;

        if($scope.reservation[x-1].LName==null){
            $scope.LNameShow=true;
            return ;
        }
        else
            $scope.LNameShow=false;

        if($scope.reservation[x-1].issueDate==null){
            $scope.IssueDateShow=true;
            return ;
        }
        else
            $scope.IssueDateShow=false;

         if($scope.reservation[x-1].expiryDate==null){
            $scope.ExpiryDateShow=true;
            return ;
        }
        else
            $scope.ExpiryDateShow=false;

            if($scope.reservation[x-1].passportNo==null){
            $scope.PassportNumberShow=true;
            return ;
        }
        else
            $scope.PassportNumberShow=false;

                    
     }
        setTicketReservation($scope.reservation);
        $location.url('/payment');
    };
});
