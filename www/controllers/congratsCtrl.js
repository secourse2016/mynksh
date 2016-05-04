App.controller('congratsCtrl', function($scope, $location, paymentSrv, OutReturnSrv) {
  $scope.bookingRefNo1 = paymentSrv.getBookingRefNo1();
  
  $scope.airline1 = OutReturnSrv.getSelectedOutFlight().Airline;
  $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
  if ($scope.roundTrip === 'true'){
    $scope.airline2 = OutReturnSrv.getSelectedReturnFlight().Airline;
    $scope.bookingRefNo2 = paymentSrv.getBookingRefNo2();
  }

  console.log($scope.bookingRefNo1);
  console.log($scope.bookingRefNo2);

  paymentSrv.getOtherAirlineIP($scope.airline1).success(function(airlineIP) {
    $scope.urlAirline1 = airlineIP;
    console.log($scope.urlAirline1);
  });

  paymentSrv.getOtherAirlineIP($scope.airline2).success(function(airlineIP) {
    $scope.urlAirline2 = airlineIP;
    console.log($scope.urlAirline2);
  });

  // $scope.goToUrl1=function(){
  // 	$window.location.href = 'http://'+$scope.urlAirline1;
  // };
  // $scope.goToUrl2=function(){
  // 	$window.location.href = 'http://'+$scope.urlAirline2;
  // };
  $scope.copy = function() {
    var copyTextarea = document.querySelector('.js-copytextarea');
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };

  $scope.copy2 = function() {
    var copyTextarea2 = document.querySelector('.js-copytextarea2');
    copyTextarea2.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };
  $scope.landing = function() {
    $location.url('/home');
  };

});
