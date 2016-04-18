App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

    $scope.tab = "active in";
    $scope.reservation = ConfirmSrv.getReservation();
    $scope.totalPrice = OutReturnSrv.getSelectedPrice();
    $scope.cabin=FlightsSrv.getSelectedCabin();
    var roundTrip = FlightsSrv.getSelectedRoundTrip();
    var outgoingFlight= OutReturnSrv.getSelectedOutFlight();
    if(roundTrip == 'true')
        returnFlight = OutReturnSrv.getSelectedReturnFlight();
    $scope.outCurrency = outgoingFlight.currency;

    $scope.tab1 = function() {
        $scope.tab = "active in";
        $scope.tab2 = "";
    };

    $scope.tab2 = function() {
        $scope.tab2 = "active in";
        $scope.tab = "";
    };


    var Congrats = function() {
        $location.url('/congrats');
    };


    $scope.clicked = "clicked";
    $scope.isShown = function(clicked) {
        return clicked === $scope.clicked;
    };

    var postAPay = function() {
        $scope.bookingRefNumber = $scope.getBookingRef() ;
        paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, outgoingFlight ,   $scope.cabin);
        if(roundTrip =='true')
            paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, returnFlight ,   $scope.cabin);
    };

    var SetCardType = function(value) {
        paymentSrv.setSelectedCardType(value);
    };

    var SetCardNo = function(value) {
        paymentSrv.setSelectedCardNo(value);
    };

    var SetMonth = function(value) {
        paymentSrv.setSelectedMonth(value);
    };

    var SetYear = function(value) {
        paymentSrv.setSelectedYear(value);
    };

    var SetCVV = function(value) {
        paymentSrv.setSelectedCVV(value);
    };

    var SetStreet = function(value) {
        paymentSrv.setSelectedStreet(value);
    };
    var SetInformation = function(value) {
        paymentSrv.setSelectedInformation(value);
    };
    var SetPostalcode = function(value) {
        paymentSrv.setSelectedPostalcode(value);
    };
    var SetCity = function(value) {
        paymentSrv.setSelectedCity(value);
    };

    $scope.payAction = function() {
        postAPay();
        SetCardType($scope.selectedType);
        SetCardNo($scope.selectedCardNumber);
        SetMonth($scope.selectedMonth);
        SetYear($scope.selectedYear);
        SetCVV($scope.selectedCVV);
        SetStreet($scope.selectedStreet);
        SetInformation($scope.selectedExtra);
        SetPostalcode($scope.selectedPostalcode);
        SetCity($scope.SelectedCity);
        Congrats();
    };

    //NARIHAN
    $scope.getBookingRef = function() {
        // var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        // var string_length = 8;
        // var randomstring = '';
        // for (var i=0; i<string_length; i++) {
        //  var rnum = Math.floor(Math.random() * chars.length);
        //  randomstring += chars.substring(rnum,rnum+1);
        // }
        // // document.randform.randomfield.value = randomstring;
        //
        //
        //   var str1=randomstring;

        //encode and get the first part of the outgoing date
        var card = $scope.selectedCardNumber;
        // var outDate = FlightsSrv.getSelectedOutDate();
        // var str4 = JSON.stringify(outDate);
        // var arr = str4.split("T");
        // var outDate = arr[0];
        // var arr = outDate.split("-");
        // var outDate = arr[1] + "/" + arr[2];

        //encode and get the first part of the return date
        // var returnDate=FlightsSrv.getSelectedReturnDate();
        // var str5=JSON.stringify(returnDate);
        // var arr2=str5.split("T");
        // var returnDate=arr2[0];
        // var arr2=returnDate.split("-");
        // var returnDate=arr2[1]+"/"+arr2[2];
        // var arr2=str4.split(/[ ,]+/);
        // var str3=arr2[1]+"/"+arr2[2];
        //
        var outFlightNo = OutReturnSrv.getSelectedOutFlight().flightNumber;
        // var returnFlightNo= OutReturnSrv.getSelectedReturnFlight().flightNumber;
        var str = card + ","  + outFlightNo;
        // +","+outFlightNo+","+returnFlightNo;
        // var str="hey how are you";
        // var arr=str.split(/[ ,]+/);
        // var str2=arr[1]+"/"+arr[2];
        var enc = window.btoa(str);
        var dec = window.atob(enc);

        var res = "Booking Reference:(please copy it for further tracking): " + "<br>" + enc + "<br>" + "Decoded String: " + dec;
        // "<br>" + "Decoded String: " + dec;
        document.getElementById("demo").innerHTML = res;

        return enc;

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