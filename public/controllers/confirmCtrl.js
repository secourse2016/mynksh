App.controller('confirmCtrl', function($scope, FlightsSrv , $location) {

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
    var fname;
    var lname;
    $scope.origin = FlightsSrv.getSelectedOriginAirport();
    var flightNumber = "2";
    $scope.dest = FlightsSrv.getSelectedDestinationAirport();
    $scope.oDate = FlightsSrv.getSelectedOutDate();
    $scope.rDate = FlightsSrv.getSelectedReturnDate();
    // $scope.price=FlightsSrv.g
    $scope.tickets = FlightsSrv.getSelectedNumberOfTickets();


    $scope.reservation = [];

    $scope.typedFname = "";
    $scope.typedLname = "";
    $scope.typedCountry = "";
    $scope.typedPassportno = "";
    $scope.typedIssueDate = "";
    $scope.typedExpiryDate = "";
    $scope.typedEmail = "";
    $scope.typePhoneno = "";

 $scope.bol = "1" ;
      $scope.counter = "1";

      $scope.incCounter = function() {
         $scope.counter =  $scope.counter + 1 ; 
    };

    $scope.decCounter = function() {
       $scope.counter =  $scope.counter - 1 ;
    };

       $scope.setTicketfirstName = function(value) {
        confirmSrv.setFname(value) ;
    };
 
 $scope.number = FlightsSrv.getSelectedNumberOfTickets();

$scope.getNumber = function(num) {
    return new Array(num);   
};

$scope.isGreaterThanTickets = function(num) {
    return num < $scope.number ;   
};



    // for (var bookingRef = 1; bookingRef< 5; bookingRef++) {
    //     $scope.ticket = "";
    //     $scope.ticket.FName = $scope.typedFname;
    //     $scope.ticket.LName = $scope.typedLname;
    //     $scope.ticket.country = $scope.typedCountry;
    //     $scope.ticket.passportNo = $scope.typedPassportno;
    //     $scope.ticket.issueDate = $scope.typedIssueDate;
    //     $scope.ticket.expiryDate = $scope.typedExpiryDate;
    //     $scope.ticket.email = $scope.typedEmail;
    //     $scope.ticket.phone = $scope.typePhoneno;
    //     $scope.ticket.refNo = bookingRef;
    //     $scope.ticket.flight = flightNumber;
    //     $scope.reservation.push($scope.ticket);
    // };

    $scope.goToPayment = function() {
        $location.url('/flights');
    };



    // });
    // getSelectedOutDate();
    // getSelectedReturnDate();
    // getSelectedOriginAirport();
    // getSelectedDestinationAirport();
});
