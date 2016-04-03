/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv,OutReturnSrv,$location) {

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
    OutReturnSrv.getOutgoingInfo().success(function(outgoingInfo) {
         $scope.outgoingInfo = outgoingInfo;
     });
  };

  function returnInfo() {
    OutReturnSrv.getReturnInfo().success(function(returnInfo) {
         $scope.returnInfo = returnInfo;
     });
  };
  $scope.stringToDate=function(date)
  {
    return new Date(date); 
  };
  $scope.timediff = function(depart, arr)
  {
    return moment.utc(moment(arr).diff(moment(depart))).format("hh:mm");
  };
  $scope.BookFlight = function() 
  {
    $location.url('/confirm');
  };
    $scope.SetFlightNumber = function() {
    OutReturnSrv.setSelectedFlightNumber();
  };
 $scope.SetDepartureTime = function() {
    OutReturnSrv.setSelectedDepartureTime();
  };
  $scope.SetArrivalTime = function() {
    OutReturnSrv.setSelectedArrivalTime();
  };
  $scope.SetDuration = function() {
    OutReturnSrv.setSelectedDuration();
  };
  $scope.setSelectedCabin = function() {
    OutReturnSrv.setSelectedDuration();
  };
  $scope.SetDuration = function() {
    OutReturnSrv.setSelectedCabin();
  };
  $scope.SetPrice = function() {
    OutReturnSrv.setSelectedPrice();
  };
  $scope.SetOperatedBy = function() {
    OutReturnSrv.setSelectedOperatedBy();
  };
 

   $scope.origin= FlightsSrv.getSelectedOriginAirport();
   $scope.dest= FlightsSrv.getSelectedDestinationAirport();
   $scope.oDate= FlightsSrv.getSelectedOutDate();
   $scope.rDate= FlightsSrv.getSelectedReturnDate();
  // });
  outgoingInfo();
  returnInfo();
});
