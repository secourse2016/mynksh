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
    FlightsSrv.getSelectedOutDate.success(function(outgoingdate) {
         $scope.outgoingdate = outgoingdate;
     });
  };

  function getSelectedReturnDate() {
    FlightsSrv.getSelectedReturnDate().success(function(ReturnDate) {
         $scope.ReturnDate = "17/07/2016";
     });
  };
  function getSelectedOriginAirport() {
    FlightsSrv.getSelectedOriginAirport().success(function(OriginAirport) {
         $scope.OriginAirport = OriginAirport;
     });
  };
  function getSelectedDestinationAirport() {
    FlightsSrv.getSelectedDestinationAirport().success(function(DestinationAirport) {
         $scope.DestinationAirport = DestinationAirport;
     });
  };
  //  $scope.origin= FlightsSrv.getSelectedOriginAirport();
  //  $scope.dest= FlightsSrv.getSelectedDestinationAirport();
  //  $scope.oDate= FlightsSrv.getSelectedOutDate();
  //  $scope.rDate= FlightsSrv.getSelectedReturnDate();
  // // });
  getSelectedOutDate();
  getSelectedReturnDate();
  getSelectedOriginAirport();
  getSelectedDestinationAirport();
});
