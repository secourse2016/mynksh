App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

  $scope.tab = "active in";
  $scope.reservation = ConfirmSrv.getReservation();
  $scope.totalPrice = OutReturnSrv.getSelectedPrice();
  $scope.cabin = FlightsSrv.getSelectedCabin();
  var roundTrip = FlightsSrv.getSelectedRoundTrip();
  var outgoingFlight = OutReturnSrv.getSelectedOutFlight();
  if (roundTrip === 'true')
    returnFlight = OutReturnSrv.getSelectedReturnFlight();
  $scope.outCurrency = outgoingFlight.currency;



  $scope.tab1 = function() {
    $scope.tab = "active in";
<<<<<<< HEAD
    $scope.reservations = ConfirmSrv.getReservations();
    $scope.totalPrice = OutReturnSrv.getSelectedPrice();
    $scope.cabin = FlightsSrv.getSelectedCabin();
    var roundTrip = FlightsSrv.getSelectedRoundTrip();
    var outgoingFlight = OutReturnSrv.getSelectedOutFlight();
    if (roundTrip == 'true')
        returnFlight = OutReturnSrv.getSelectedReturnFlight();
    if(outgoingFlight != undefined)
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
        if (roundTrip == 'true')
            paymentSrv.postPay($scope.reservations, outgoingFlight, returnFlight, $scope.cabin).success(function(data){
               paymentSrv.setBookingRefNo(data.encoding);
            });
        else
            paymentSrv.postPay($scope.reservations, outgoingFlight, $scope.cabin).success(function(data){
                paymentSrv.setBookingRefNo(data.encoding);
            });
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

    $scope.payAction = function() {
        postAPay();
        SetCardNo($scope.selectedCardNumber);
        SetMonth($scope.selectedMonth);
        SetYear($scope.selectedYear);
        SetCVV($scope.selectedCVV);
    };
});
