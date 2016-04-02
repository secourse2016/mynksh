App.controller('confirmCtrl', function($scope, confirmSrv) {

  /* Retrieve Selected Airports Codes */
  // $scope.flight = {
  //   origin      : FlightsSrv.getSelectedOriginAirport(),
  //   destination : FlightsSrv.getSelectedDestinationAirport()
  // };
   
   // $http.get("/api/returnInfo").then(function(response){
   //  $scope.returnInfo= response.data.records;

   // });
   $scope.roundTrip=true;
   function getSelectedOutDate() {
    confirmSrv.getSelectedOutDate.success(function(outgoingdate) {
         $scope.outgoingdate = outgoingdate;
     });
  };

  function getSelectedReturnDate() {
    FlightsSrv.getSelectedReturnDate().success(function(ReturnDate) {
         $scope.ReturnDate = ReturnDate;
     });
  };
   $scope.origin= FlightsSrv.getSelectedOriginAirport();
   $scope.dest= FlightsSrv.getSelectedDestinationAirport();
   $scope.oDate= FlightsSrv.getSelectedOutDate();
   $scope.rDate= FlightsSrv.getSelectedReturnDate();
  // });
  outgoingInfo();
  returnInfo();
});
