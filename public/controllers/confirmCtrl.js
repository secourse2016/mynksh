App.controller('confirmCtrl', function($scope, FlightsSrv, $location) {

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
    // $scope.price=FlightsSrv.g

    $scope.setTicketfirstName = function(value) {
        confirmSrv.setFname(value);
    };

    $scope.getNumber = function(num) {
        return new Array(num);
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

    // });
    // getSelectedOutDate();
    // getSelectedReturnDate();
    // getSelectedOriginAirport();
    // getSelectedDestinationAirport();
});
