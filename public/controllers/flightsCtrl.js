/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope,$http, FlightsSrv) {

  /* Retrieve Selected Airports Codes */
  // $scope.flight = {
  //   origin      : FlightsSrv.getSelectedOriginAirport(),
  //   destination : FlightsSrv.getSelectedDestinationAirport()
  // };
   
  	//should be in a service file
   $http.get("/api/outgoingInfo").then(function(response){
    $scope.outgoingInfo= response.data.records;

   });
   $http.get("/api/returnInfo").then(function(response){
    $scope.returnInfo= response.data.records;

   });
   $scope.origin= FlightsSrv.getSelectedOriginAirport();
   $scope.dest= FlightsSrv.getSelectedDestinationAirport();
   $scope.oDate= FlightsSrv.getSelectedOutDate();
   $scope.rDate= FlightsSrv.setSelectedReturnDate();
  // });

});
