/**
 * Flights Controller
 */
App.controller('paymentCtrl', function($scope,PaymentSrv,FlightsSrv,OutReturnSrv,$location) {



    $scope.goCocontinuePay2 = function() {
      $location.url('/flights');
    };


});
