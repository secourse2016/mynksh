/**
 * payment Controller
 */
 App.controller('paymentCtrl', function($scope, FlightsSrv,OutReturnSrv, paymentSrv, $location) {
  $scope.no = "node";


   function countryCode() {
     paymentSrv.getCountry().success(function(country) {
          $scope.Country = country;
      });
   };


   $scope.Porigin= FlightsSrv.getSelectedOriginAirport();
   $scope.Pdest= FlightsSrv.getSelectedDestinationAirport();
   $scope.PoDate= FlightsSrv.getSelectedOutDate();
   $scope.PrDate= FlightsSrv.getSelectedReturnDate();

   $scope.P_round_origin= FlightsSrv.getSelectedDestinationAirport();
   $scope.P_round_dest= FlightsSrv.getSelectedOriginAirport();
// dol lsa mstnyeko t3mlo  anko t5do l roud 3lshan 2a5od l dates bt3thom
   $scope.P_round_oDate= FlightsSrv.getSelectedOutDate();
   $scope.P_round_rDate= FlightsSrv.getSelectedReturnDate();


 });
