App.controller('confirmCtrl', function($scope, FlightsSrv) {

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
   $scope.origin= FlightsSrv.getSelectedOriginAirport();

   $scope.dest= FlightsSrv.getSelectedDestinationAirport();
   $scope.oDate= FlightsSrv.getSelectedOutDate();
   $scope.rDate= FlightsSrv.getSelectedReturnDate();
   // $scope.price=FlightsSrv.g
   $scope.tickets=FlightsSrv.getSelectedNumberOfTickets();

   var range = [];
   range.push(0);
for(var i=1;i<FlightsSrv.getSelectedNumberOfTickets();i++) {
  range.push(i);
}

   $scope.noOfTickets=range;

   $scope.goToPayment = function() {
    $location.url('/flights');
  };



  // });
  // getSelectedOutDate();
  // getSelectedReturnDate();
  // getSelectedOriginAirport();
  // getSelectedDestinationAirport();
});
