/**
 * Flights Controller
 */
App.controller('flightsCtrl', function($scope, FlightsSrv) {

	 // $(function() {
// var landingPage=angular.module('landingPage',[]);

// app.controller("PanelController", function(){
  
//   this.tab=1;

//   this.selectTab =function(setTab){
//     this.tab=setTab;
//   };

//   this.isSelected = function(checkTab){
//     return this.tab === checkTab;
//   };

//  });
// });


  /* Retrieve Selected Airports Codes */
  $scope.flight = {
    origin      : FlightsSrv.getSelectedOriginAirport(),
    destination : FlightsSrv.getSelectedDestinationAirport()
  };

});
