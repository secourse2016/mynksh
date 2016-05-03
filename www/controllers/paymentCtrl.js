App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

  $scope.reservation = ConfirmSrv.getReservations();
  $scope.totalPrice = OutReturnSrv.getSelectedPrice();
  $scope.cabin = FlightsSrv.getSelectedCabin();
  var roundTrip = FlightsSrv.getSelectedRoundTrip();
  var outgoingFlight = OutReturnSrv.getSelectedOutFlight();
  if (roundTrip == 'true')
    returnFlight = OutReturnSrv.getSelectedReturnFlight();
  $scope.outCurrency = outgoingFlight.currency;

  function changeISOFormat(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(date);
    return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  };

  var Congrats = function() {
    $location.url('/congrats');
  };


  $scope.clicked = "clicked";
  $scope.isShown = function(clicked) {
    return clicked === $scope.clicked;
  };

  $scope.SetCardNo = function(value) {
    paymentSrv.setSelectedCardNo(value);
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
    // SetCardNo($scope.selectedCardNumber);
    // SetMonth($scope.selectedMonth);
    // SetYear($scope.selectedYear);
    // SetCVV($scope.selectedCVV);
    var returnFlightId;
    if (FlightsSrv.getSelectedRoundTrip() === 'true')
      var returnFlightId = OutReturnSrv.getSelectedReturnFlight().flightId;
    paymentInfo = {
      "passengerDetails": $scope.reservation,
      "class": FlightsSrv.getSelectedCabin(),
      "cost": OutReturnSrv.getSelectedPrice(),
      "outgoingFlightId": OutReturnSrv.getSelectedOutFlight().flightId,
      "returnFlightId": returnFlightId,
      "paymentToken": 2112
    }
    for (var i = 0; i < paymentInfo.length; i++) {
      paymentInfo[i].passengerDetails.dateOfBirth = moment(changeISOFormat(paymentInfo[i].passengerDetails.dateOfBirth)).toDate().getTime();
      if (paymentInfo[i].passengerDetails.passportExpiryDate === undefined)
        paymentInfo[i].passengerDetails.passportExpiryDate = moment(changeISOFormat(paymentInfo[i].passengerDetails.passportExpiryDate)).toDate().getTime()
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
        pingIp = "http://localhost:8080";
      else
        pingIp = "http://" + airlineIP;
      Stripe.setPublishableKey(key);
      console.log(paymentSrv.getSelectedCardNo());
      console.log(paymentSrv.getSelectedCVV());
      console.log(paymentSrv.getSelectedMonth());
      console.log(paymentSrv.getSelectedYear());
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
          getOtherPubKey("IBERIA", function(key) {
            Stripe.setPublishableKey(key);
            Congrats();
          });
        });
    }

  };
});
