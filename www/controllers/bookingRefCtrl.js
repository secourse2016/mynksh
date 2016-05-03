App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location, BookingSrv, $http,$mdDialog, $mdMedia) {

    $scope.SetBookingRef = function(value) {
        BookingSrv.setSelectedBookingRef(value);
    };

    $scope.bookingref = BookingSrv.getSelectedBookingRef();

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

});

function DialogController($scope,$http,BookingSrv, $mdDialog) {

    $http.get('http://localhost:8080/data/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
      $scope.flights=flight;
    })

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

App.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});
