/**
 * payment Controller
 */
 App.controller('paymentCtrl', function($scope, FlightsSrv,OutReturnSrv, paymentSrv, $location) {
  $scope.no = "node";

  $scope.goToBriefConfirmation= function() {
    $location.url('/flights');
  };

   function countryCode() {
     paymentSrv.getCountry().success(function(country) {
          $scope.Country = country;
      });
   };

   /* set paymet form  */
   $scope.SetCountry = function(value) {
     paymentSrv.setSelectedCountry(value);
   };

   $scope.SetFirstName = function(value) {
     paymentSrv.setSelectedFirstName(value);
   };

   $scope.SetSurname = function(value) {
            paymentSrv.setSelectedSurname(value);
   };
   $scope.SetPassengers = function(value) {
            paymentSrv.setSelectedPassengers(value);
   };
   $scope.SetStret = function(value) {
            paymentSrv.setselectedStret(value);
   };
   $scope.SetInformation = function(value) {
            paymentSrv.setSelectedinformation(value);
   };
   $scope.SetPostalcode = function(value) {
            paymentSrv.setselectedPostalcode(value);
   };
   $scope.SetCity = function(value) {
            paymentSrv.setSelectedCity(value);
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
countryCode();

 });
