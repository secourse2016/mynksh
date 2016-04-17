/**
 * payment Controller
 */
App.controller('paymentCtrl', function($scope, FlightsSrv,ConfirmSrv, OutReturnSrv, paymentSrv, $location) {
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


    // function postIntoBooking() { $http.post('../../modules/bookings.json',{text:$scope.totalPrice}).success(function(response){
    //
    //   $scope.Success = "success to pay";
    //
    //
    //
    // });
    //   };
// test post

$scope.postAPay = function( ) {
  console.log('i`m in ctrl');
  $scope.firstName ="ha5odhma mn conf msh m3mola" ;
  $scope.lastName = "isabardo ha5odha mn  conf";
  $scope.passport = "same lsa msh m3mola  fl  conf srv";
  $scope.passportNumber = "bardo lsa ";
  $scope.issueDate = "22-5-2016" ;
  $scope.expiryDate = "22-3-2020";
  $scope.email = ConfirmSrv.getEmail();
  $scope.phoneNumber = ConfirmSrv.getPhoneNo();
  $scope.bookingRefNumber ="ha5do mn nary" ;
  $scope.flightNumber = "flight.flightNumber";

    paymentSrv.postPay($scope.firstName ,   $scope.lastName ,   $scope.passport ,   $scope.passportNumber ,   $scope.issueDate ,  $scope. expiryDate ,   $scope.email ,   $scope.phoneNumber ,   $scope.bookingRefNumber  ,   $scope.flightNumber);
};
//

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
    countryCode();


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
