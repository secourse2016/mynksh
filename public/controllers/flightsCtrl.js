/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv,OutReturnSrv,$location) {

   $scope.roundTrip=false;
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

  outgoingInfo();
  returnInfo();

  //calculating the price
  if($scope.roundTrip == true){
    $scope.returnCabin = '';
    $scope.$watch('returnCabin',function() {
      if($scope.returnCabin == 'economy')
        $scope.returnPrice = $scope.selectedReturnFlight.eCost;
      if($scope.returnCabin == 'business')
        $scope.returnPrice = $scope.selectedReturnFlight.bCost;
    });
  }
  $scope.outgoingCabin = '';
  $scope.$watch('outgoingCabin',function() {$scope.calcOut();},true);
  // $scope.$watch('selectedOutgoingFlight',function() {$scope.totalPrice=$scope.selectedOutgoingFlight.eCost;});
  $scope.w = 0;
  $scope.calcOut = function(){ 
    if($scope.outgoingCabin === "economy"){
        $scope.outgoingPrice = $scope.selectedReturnFlight.eCost;
      };
    if($scope.outgoingCabin === "business"){
        $scope.outgoingPrice = $scope.selectedReturnFlight.bCost;
      };

    $scope.w++;  
  };


  // $scope.calculatePrice =function(){
  //   if($scope.outgoingCabin == "economy")
  //    if(roundTrip == true){
  //     if($scope.returnCabin == "economy")
  //         $scope.totalPrice = $selectedOutgoingInfo.eCost + $selectedReturnFlight.eCost;
  //     else if($scope.returnCabin == "business")
  //         $scope.totalPrice = $selectedOutgoingFlight.eCost + $selectedReturnFlight.bCost;
  //     }
  //    else $scope.totalPrice = $selectedOutgoingFlight.eCost;

  //   if($scope.outgoingCabin == "business")
  //    if(roundTrip == true){
  //     if($scope.returnCabin == "economy")
  //         $scope.totalPrice = $selectedOutgoingFlight.bCost + $selectedReturnFlight.eCost;
  //     else if($scope.returnCabin == "business")
  //         $scope.totalPrice = $selectedOutgoingFlight.bCost + $selectedReturnFlight.bCost;
  //     }
  //    else $scope.totalPrice = $selectedOutgoingFlight.bCost;
  // };
});
