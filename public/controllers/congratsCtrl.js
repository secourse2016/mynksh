App.controller('congratsCtrl', function($scope, paymentSrv, OutReturnSrv, $http) {


  $scope.bookingRefNo1 = paymentSrv.getBookingRefNo1();
  $scope.bookingRefNo2 = paymentSrv.getBookingRefNo2();
  $scope.airline1 = OutReturnSrv.getSelectedOutFlight().Airline;

  console.log($scope.bookingRefNo1);
  console.log($scope.bookingRefNo2);
  console.log($scope.airline1);
  console.log($scope.airline2);

  paymentSrv.getOtherAirlineIP1($scope.airline1).success(function(airlineIP) {
    $scope.urlAirline1 = airlineIP;
		console.log($scope.urlAirline1);
  });

  paymentSrv.getOtherAirlineIP1($scope.airline1).success(function(airlineIP) {
    $scope.urlAirline2 = airlineIP;
		console.log($scope.urlAirline2);
  });

  //
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
});
