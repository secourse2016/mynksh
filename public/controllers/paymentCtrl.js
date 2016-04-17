/**
 * payment Controller
 */
App.controller('paymentCtrl', function($scope, FlightsSrv, OutReturnSrv, paymentSrv, $location) {
    $scope.no = "node";
    $scope.tab = "active in";

    $scope.tab1 = function() {
        $scope.tab = "active in";
        $scope.tab2 = "";
    };

    $scope.tab2 = function() {
        $scope.tab2 = "active in";
        $scope.tab = "";
    };


    $scope.Congrats = function() {
        $location.url('/congrats');
    };


    $scope.clicked="clicked";
    $scope.isShown = function(clicked) {
        return clicked === $scope.clicked;
    };


    $scope.postIntoBooking = function() {
        var customer = {
            contact_name: "Scott",
            company_name: "HP"
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(customer),
            url: "/api/data/bookings",
            contentType: "application/json"
        });

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

    $scope.SetCardType = function(value) {
        paymentSrv.setSelectedCardType(value);
    };

    $scope.SetCaradNo = function(value) {
        paymentSrv.setSelectedCaradNo(value);
    };

    $scope.SetMonth = function(value) {
        paymentSrv.setSelectedMonth(value);
    };

    $scope.SetYear = function(value) {
        paymentSrv.setSelectedYear(value);
    };

    $scope.SetCVV = function(value) {
        paymentSrv.setSelectedCVV(value);
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

    $scope.noOfPassengers = FlightsSrv.getSelectedNumberOfTickets();
    //   llsa  m3rfsh ha5odha mn meen
    $scope.totalPrice = OutReturnSrv.getSelectedPrice();

    $scope.Porigin = FlightsSrv.getSelectedOriginAirport();
    $scope.Pdest = FlightsSrv.getSelectedDestinationAirport();
    $scope.PoDate = FlightsSrv.getSelectedOutDate();
    $scope.PrDate = FlightsSrv.getSelectedReturnDate();

    $scope.P_round_origin = FlightsSrv.getSelectedDestinationAirport();
    $scope.P_round_dest = FlightsSrv.getSelectedOriginAirport();
    // dol lsa mstnyeko t3mlo  anko t5do l roud 3lshan 2a5od l dates bt3thom
    $scope.P_round_oDate = FlightsSrv.getSelectedOutDate();
    $scope.P_round_rDate = FlightsSrv.getSelectedReturnDate();
    $scope.cardNo=paymentSrv.getSelectedCaradNo();
    countryCode();

    //NARIHAN
     $scope.getBookingRef= function() {
      // var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    	// var string_length = 8;
    	// var randomstring = '';
    	// for (var i=0; i<string_length; i++) {
    	// 	var rnum = Math.floor(Math.random() * chars.length);
    	// 	randomstring += chars.substring(rnum,rnum+1);
    	// }
    	// // document.randform.randomfield.value = randomstring;
      //
      //
      //   var str1=randomstring;

      //encode and get the first part of the outgoing date
        var str1= paymentSrv.getSelectedCaradNo();
        var str2= FlightsSrv.getSelectedOutDate();
        var str4=JSON.stringify(str2);
        var arr=str4.split("T");
        var str2=arr[0];
        var arr=str2.split("-");
        var str2=arr[1]+"/"+arr[2];

        //encode and get the first part of the return date
        var str3=FlightsSrv.getSelectedReturnDate();
        var str5=JSON.stringify(str3);
        var arr2=str5.split("T");
        var str3=arr2[0];
        var arr2=str3.split("-");
        var str3=arr2[1]+"/"+arr2[2];
        // var arr2=str4.split(/[ ,]+/);
        // var str3=arr2[1]+"/"+arr2[2];
        var str=str1+","+str2+","+str3;
        // var str="hey how are you";
        // var arr=str.split(/[ ,]+/);
        // var str2=arr[1]+"/"+arr[2];
        var enc = window.btoa(str);
        var dec = window.atob(enc);

        var res = "Booking Reference:(please copy it for further tracking): "+ "<br>"+enc+"<br>" + "Decoded String: " + dec;
        // "<br>" + "Decoded String: " + dec;
        document.getElementById("demo").innerHTML = res;

    };


    //End of Narihan


});

// App.directive('ngConfirmClick', [
//     function(){
//         return {
//             priority: 1,
//             terminal: true,
//             link: function (scope, element, attr) {
//                 var msg = attr.ngConfirmClick || "Are you sure?";
//                 var clickAction = attr.ngClick;
//                 element.bind('click',function (event) {
//                     if ( window.confirm(msg) ) {
//                         scope.$eval(clickAction)
//                     }
//                 });
//             }
//         };
// }])
