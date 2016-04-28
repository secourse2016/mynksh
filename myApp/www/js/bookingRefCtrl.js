App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location, BookingSrv, $http) {

    $scope.SetBookingRef = function(value) {
        BookingSrv.setSelectedBookingRef(value);
    };

    $scope.bookingref = BookingSrv.getSelectedBookingRef();

    $scope.retreiveBookingRef = function() {
      $http.get('/data/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
             // if(flight.length ==1){
              var firstName = flight[0].firstName;
              var lastName = flight[0].lastName;
              var passport = flight[0].passportNumber;
              var seatO = flight[0].seatNum;
              var arrivalTimeO=flight[0].arrivalTime;
              var departureTimeO=flight[0].departureTime;
              var originO=flight[0].origin;
              var destinationO=flight[0].destination;
              var flightNumO=flight[0].flightNumber;
            if(flight.length ==2){
              var seatR = flight[1].seatNum;
              var flightNumR=flight[1].flightNumber;
              var arrivalTimeR=flight[1].arrivalTime;
               var departureTimeR=flight[1].departureTime;
               var originR=flight[1].origin;
               var destinationR=flight[1].destination;
            }
        console.log(flight);
        var input = BookingSrv.getSelectedBookingRef();
        //var div = document.getElementById('divID');

        var atobConv = window.atob(input);
        //var res = "Booking Reference:(please copy it for further tracking): " + "<br>" + enc + "<br>" + "Decoded String: " + dec;

        // "<br>" + "Decoded String: " + dec;

        var arr = atobConv.split(",");
        var visaNum = arr[0];
        var outDate = arr[1];
        // var flightNumO = arr[2];
        var res = "Hello, " +firstName + " " + lastName + "!" +
        "<br>" + "Your Passport is " + passport + "<br>" +"Your Visa Number is " + visaNum +"<br>"
         + "Your Seat Number in the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+departureTimeO+" is "+seatO+
          "<br>"+ "Your Flight number is " + flightNumO;
          if(flight.length==2){
            var res = "Hello, " + firstName + " " + lastName + "!" +
        "<br>" + "Your Passport is " + passport + "<br>" +"Your Visa Number is " + visaNum +"<br>"
         + "Your Seat Number on the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+
         departureTimeO+" is "+seatO+ "<br>"+ "Your Flight number is " + flightNumO+"<br>"+"Your Seat Number on the flight from "
         +originR+" on "+arrivalTimeR+" to "+destinationR+" on "+
         departureTimeR+" is "+seatR+ "<br>"+ "Your Flight number is " + flightNumR;
          }
        document.getElementById("divID").innerHTML = res;
      });
    }

});
