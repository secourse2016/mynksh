App.controller('tabsCtrl', function($scope, $state) {


  $scope.bookingFlight = function() {
    $state.go('landing');
  };

  $scope.bookingPrev = function() {
    $state.go('bookingRef');
  };

  $scope.promotions = function() {
    $state.go('offer');
  };
});
