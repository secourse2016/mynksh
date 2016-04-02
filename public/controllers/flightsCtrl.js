/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv) {

  /* Retrieve Selected Airports Codes */
  // $scope.flight = {
  //   origin      : FlightsSrv.getSelectedOriginAirport(),
  //   destination : FlightsSrv.getSelectedDestinationAirport()
  // };
   
   // $http.get("/api/returnInfo").then(function(response){
   //  $scope.returnInfo= response.data.records;

   // });
   $scope.roundTrip=true;
   function outgoingInfo() {
    FlightsSrv.getOutgoingInfo().success(function(outgoingInfo) {
         $scope.outgoingInfo = outgoingInfo;
     });
  };

  function returnInfo() {
    FlightsSrv.getReturnInfo().success(function(returnInfo) {
         $scope.returnInfo = returnInfo;
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
