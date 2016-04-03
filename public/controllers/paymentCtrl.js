/**
 * Flights Controller
 */
App.controller('paymentCtrl', function($scope, paymentSrv,FlightsSrv, $location) {


    $scope.goPay = function() {
      $location.url('/payment');
    };
});
