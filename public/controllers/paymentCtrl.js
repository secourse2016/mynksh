App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

  $scope.tab = "active in";
  $scope.reservation = ConfirmSrv.getReservation();
  $scope.totalPrice = OutReturnSrv.getSelectedPrice();
  $scope.cabin = FlightsSrv.getSelectedCabin();
  // console.log($scope.reservation);
  // console.log($scope.totalPrice);
  // console.log($scope.cabin);

  var roundTrip = FlightsSrv.getSelectedRoundTrip();
  var outgoingFlight = OutReturnSrv.getSelectedOutFlight();
  if (roundTrip == 'true')
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


  // var postAPay = function() {
  //     $scope.bookingRefNumber = $scope.getBookingRef();
  //     paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, outgoingFlight, $scope.cabin).success(function()
  //         {
  //             if (roundTrip == 'true')
  //                 paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, returnFlight, $scope.cabin).success(function(){
  //                       Congrats();
  //                 });
  //         });

  // };

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

  var getOtherPubKey = function(AirlineIP, cb) {
    paymentSrv.getOtherAirlineIP(AirlineIP).success(function(airlineIP) {
      console.log(airlineIP);
      paymentSrv.getOtherStripePubKey(airlineIP).success(function(key) {
        console.log(key);
        cb(key, airlineIP);
      })
    });
  };

  var paymentInfo = {};

  $scope.payAction = function() {
    SetCardType($scope.selectedType);
    SetCardNo($scope.selectedCardNumber);
    SetMonth($scope.selectedMonth);
    SetYear($scope.selectedYear);
    SetCVV($scope.selectedCVV);
    SetStreet($scope.selectedStreet);
    SetInformation($scope.selectedExtra);
    SetPostalcode($scope.selectedPostalcode);
    SetCity($scope.SelectedCity);
    var returnFlightId;
    if (FlightsSrv.getSelectedRoundTrip() === 'true')
      var returnFlightId = OutReturnSrv.getSelectedReturnFlight().flightId;
    paymentInfo = {
      "passengerDetails": [{
        "firstName": ConfirmSrv.getReservation().FName,
        "lastName": ConfirmSrv.getReservation().LName,
        "passportNum": ConfirmSrv.getReservation().passportNo,
        "passportExpiryDate": ConfirmSrv.getReservation().expiryDate, //convert this to moment
        // "dateOfBirth": moment(ConfirmSrv.getReservation()., 'MMMM D, YYYY hh:mm:ss').toDate().getTime(),
        // "nationality":  ConfirmSrv.getReservation().,
        "dateOfBirth": moment("April 12, 2016", 'MMMM D, YYYY hh:mm:ss').toDate().getTime(),
        "nationality": "Egypt",
        "email": ConfirmSrv.getReservation().email

      }],
      "class": FlightsSrv.getSelectedCabin(),
      "cost": OutReturnSrv.getSelectedPrice(),
      "outgoingFlightId": OutReturnSrv.getSelectedOutFlight().flightId,
      "returnFlightId": returnFlightId,
      "paymentToken": 2112
    }
    if (FlightsSrv.getSelectedRoundTrip() != 'true')
      paymentInfo.returnFlightId = undefined;
    //need here to check if one way or two and put this name attrubute inside createStripeToken method
    var AirlineName1 = OutReturnSrv.getSelectedOutFlight().Airline; //  out flight
    var AirlineName2;
    if (FlightsSrv.getSelectedRoundTrip() === 'true')
      var AirlineName2 = OutReturnSrv.getSelectedReturnFlight().Airline;; // return flight
    if (FlightsSrv.getSelectedRoundTrip() === 'false' || AirlineName1 === AirlineName2)
      createStripeToken(AirlineName1);
    else {
      createStripeToken(AirlineName1);
      createStripeToken(AirlineName2);
    }

  }
  var pingIp;

  var createStripeToken = function(airline) {

    getOtherPubKey(airline, function(key, airlineIP) {
      if (airlineIP === "IBERIA")
        pingIp = "";
      else
        pingIp = "http://" + airlineIP;
      Stripe.setPublishableKey(key);
      Stripe.card.createToken({
        "number": paymentSrv.getSelectedCardNo().toString(),
        "cvc": paymentSrv.getSelectedCVV(),
        "exp_month": paymentSrv.getSelectedMonth(),
        "exp_year": paymentSrv.getSelectedYear()
      }, stripeResponseHandler);

    });
  };

  var stripeResponseHandler = function(status, response) {
    if (response.error)
      alert(response.error.message);
    else {
      paymentInfo.paymentToken = response.id;
      paymentSrv.chargeCard(paymentInfo, pingIp)
        .success(function(data, status, headers, config) {
          paymentSrv.setBookingRefNo(data.refNum);
          //reset stripe key
          getOtherPubKey(airline, function(key) {
            Stripe.setPublishableKey(key);
            Congrats();
          });
        });
    }

  };
  //End of Narihan

});
