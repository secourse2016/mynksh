App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location, BookingSrv, $http) {

    $scope.SetBookingRef = function(value) {
        BookingSrv.setSelectedBookingRef(value);
    };

    $scope.bookingref = BookingSrv.getSelectedBookingRef();

    $scope.retreiveBookingRef = function() {
      $http.get('/api/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
              $scope.firstName = flight.firstName;
              $scope.lastName = flight.lastName;
              $scope.passport = flight.passport;
              
        var input = BookingSrv.getSelectedBookingRef();
        //var div = document.getElementById('divID');

        var atobConv = window.atob(input);
        //var res = "Booking Reference:(please copy it for further tracking): " + "<br>" + enc + "<br>" + "Decoded String: " + dec;

        // "<br>" + "Decoded String: " + dec;

        var arr = atobConv.split(",");
        var visaNum = arr[0];
        var outDate = arr[1];
        var flightNum = arr[2];
        var res = "Hello, " + $scope.firstName + " " + $scope.lastName + "!" + "<br>" + "Your Passport is " + $scope.passport + "<br>" + "Your Visa Number is " + visaNum + "<br>" + "Your Outgoing Flight is On " + outDate + "<br>" + "Your Flight Number is " + flightNum;
        document.getElementById("divID").innerHTML = res;
      });
    }

});
