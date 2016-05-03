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

    $scope.retreiveBookingRef = function() {
      $http.get('http://localhost:8080/data/bookings/search/' + BookingSrv.getSelectedBookingRef()).success(function(flight) {
             // if(flight.length ==1){
        //       var firstName = flight[0].firstName;
        //       var lastName = flight[0].lastName;
        //       var passport = flight[0].passportNumber;
        //       var phoneNum=flight[0].phoneNumber;
        //       var seatO = flight[0].seatNum;
        //       var arrivalTimeO=flight[0].arrivalTime;
        //       var departureTimeO=flight[0].departureTime;
        //       var originO=flight[0].origin;
        //       var destinationO=flight[0].destination;
        //       var flightNumO=flight[0].flightNumber;
        //
        //     if(flight.length ==2){
        //       var seatR = flight[1].seatNum;
        //       var flightNumR=flight[1].flightNumber;
        //       var arrivalTimeR=flight[1].arrivalTime;
        //        var departureTimeR=flight[1].departureTime;
        //        var originR=flight[1].origin;
        //        var destinationR=flight[1].destination;
        //     }
        // var input = BookingSrv.getSelectedBookingRef();
        //var div = document.getElementById('divID');

        // var atobConv = window.atob(input);
        // var arr = atobConv.split(",");
        // var visaNum = arr[0];

        // var flightNumO = arr[2];
      // res = "Hello, " +firstName + " " + lastName + "!"+
      // " Your Passport is " + passport +"."+
      // " We will call you on " + phoneNum+ " to confirm your reservation."+
      // " Your Seat Number in the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+departureTimeO+" is "+seatO +"."+
      // " Your Flight number is " + flightNumO+".";
      //
      // if(flight.length==2){
      // res = "Hello, " + firstName + " " + lastName + "!"+
      // " Your Passport is " +passport+ "."+
      // " We will call you on " + phoneNum+"to confirm your reservation."+
      //  " Your Seat Number on the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+
      //  departureTimeO+" is "+seatO+ "."+ " Your Flight number is " + flightNumO+"."+
      //  " Your Seat Number on the flight from "
      //  +originR+" on "+arrivalTimeR+" to "+destinationR+" on "+
      //  departureTimeR+" is "+seatR+ "."+ " Your Flight number is " + flightNumR+".";
      //   }
        var res = "Hello, " +firstName + " " + lastName + "!";
        var res2= "Your Passport is " + passport +"." +"<br>";
        var res3= "We will call you on " + phoneNum +" to confirm the reservation.";
         var res4= "Your Seat Number in the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+departureTimeO+" is "+seatO +"."+"</br>"+"Your Flight number is " + flightNumO+".";
         var res5="No return flight, you booked one way ticket.";

        if(flight.length==2){
        var res = "Hello, " + firstName + " " + lastName + "!";
        var res2="Your Passport is " +passport+ "."+"<br>";
        var res3="We will call you on " + phoneNum+" to confirm your reservation.";
         var res4= "Your Seat Number on the flight from "+originO+" on "+arrivalTimeO+" to "+destinationO+" on "+
         departureTimeO+" is "+seatO+ "."+"<br>"+ "Your Flight number is " + flightNumO+"."+"<br>";
         var res5="Your Seat Number on the flight from "
         +originR+" on "+arrivalTimeR+" to "+destinationR+" on "+
         departureTimeR+" is "+seatR+"."+ "<br>"+ "Your Flight number is " + flightNumR+".";
          }
        document.getElementById("divID").innerHTML = res;
        document.getElementById("divID2").innerHTML = res2;
        document.getElementById("divID3").innerHTML = res3;
        document.getElementById("divID4").innerHTML = res4;
        document.getElementById("divID5").innerHTML = res5;
      });
    }

});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
