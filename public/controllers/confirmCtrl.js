App.controller('confirmCtrl', function($scope, FlightsSrv, OutReturnSrv, ConfirmSrv, $location) {

    /* Retrieve Selected Airports Codes */
    // $scope.flight = {
    //   origin      : FlightsSrv.getSelectedOriginAirport(),
    //   destination : FlightsSrv.getSelectedDestinationAirport()
    // };

    // $http.get("/api/returnInfo").then(function(response){
    //  $scope.returnInfo= response.data.records;

    // });
    //  $scope.roundTrip=true;
    //  function getSelectedOutDate() {
    //   FlightsSrv.getSelectedOutDate.success(function(outgoingdate) {
    //        $scope.outgoingdate = outgoingdate;
    //    });
    // };
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    $scope.tickets = FlightsSrv.getSelectedNumberOfTickets();
    $scope.price = OutReturnSrv.getSelectedPrice();
    // $scope.price=FlightsSrv.g

    $scope.setTicketFirstName = function(value) {
        confirmSrv.setFname(value);
    };
     $scope.setTicketLastName = function(value) {
        confirmSrv.setLname(value);
    };
    $scope.setTicketIssueDate = function(value) {
        confirmSrv.setIssueDate(value);
    };
    $scope.setTicketExpiryDate = function(value) {
        confirmSrv.setExpiryDate(value);
    };
    $scope.setTicketEmail = function(value) {
        confirmSrv.setEmail(value);
    };

$scope.setTicketPhoneNo = function(value) {
        confirmSrv.setPhoneNo(value);
    };

$scope.setTicketPassportNo = function(value) {
        confirmSrv.setPassportNo(value);
    };
    $scope.setTicketPassportType = function(value) {
        confirmSrv.setPassportType(value);
    };



    

    $scope.isGreaterThanTickets = function(num) {
        return num < $scope.number;
    };

    $scope.typedFname = "";
    $scope.typedLname = "";
    $scope.typedCountry = "";
    $scope.typedPassportno = "";
    $scope.typedIssueDate = "";
    $scope.typedExpiryDate = "";
    $scope.typedEmail = "";
    $scope.typePhoneno = "";
    var flightNumber = "2";


    $scope.reservation = [];

    for (var bookingRef = 1; bookingRef< 5; bookingRef++) {
        var ticket = {};
        ticket.FName = $scope.typedFname;
        ticket.LName = $scope.typedLname;
        ticket.country = $scope.typedCountry;
        ticket.passportNo = $scope.typedPassportno;
        ticket.issueDate = $scope.typedIssueDate;
        ticket.expiryDate = $scope.typedExpiryDate;
        ticket.email = $scope.typedEmail;
        ticket.phone = $scope.typePhoneno;
        ticket.refNo = bookingRef;
        ticket.flight = flightNumber;
        $scope.reservation.push(ticket);
    };

    $scope.goToPayment = function() {
        $location.url('/payment');
    };
});
