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


  var getOtherPubKey = function(AirlineIP, cb) {
    paymentSrv.getOtherAirlineIP(AirlineIP).success(function(airlineIP) {
      // console.log(airlineIP);
      paymentSrv.getOtherStripePubKey(airlineIP).success(function(key) {
        // console.log(key);
        cb(key, airlineIP);
      })
    });
  };

  var paymentInfo = {};

  var AirlineName1 = OutReturnSrv.getSelectedOutFlight().Airline; //  out flight
  var AirlineName2;

  $scope.payAction = function() {

    SetCardNo($scope.selectedCardNumber);
    SetMonth($scope.selectedMonth);
    SetYear($scope.selectedYear);
    SetCVV($scope.selectedCVV);
    var returnFlightId;
    if (FlightsSrv.getSelectedRoundTrip() === 'true')
      var returnFlightId = OutReturnSrv.getSelectedReturnFlight().flightId;
    paymentInfo = {
      "passengerDetails": ConfirmSrv.getReservations(),
      "class": FlightsSrv.getSelectedCabin(),
      "cost": OutReturnSrv.getSelectedPrice(),
      "outgoingFlightId": OutReturnSrv.getSelectedOutFlight().flightId,
      "returnFlightId": returnFlightId,
      "paymentToken": 2112
    };

    for (var i = 0; i < paymentInfo.length; i++) {
      paymentInfo[i].passengerDetails.dateOfBirth = moment(changeISOFormat(paymentInfo[i].passengerDetails.dateOfBirth)).toDate().getTime();
      if (paymentInfo[i].passengerDetails.passportExpiryDate === undefined)
        paymentInfo[i].passengerDetails.passportExpiryDate = moment(changeISOFormat(paymentInfo[i].passengerDetails.passportExpiryDate)).toDate().getTime()
    }

    if (FlightsSrv.getSelectedRoundTrip() != 'true'){
      paymentInfo.cost = OutReturnSrv.getSelectedOutFlight().cost;
      paymentInfo.returnFlightId = undefined;
    }

    if (FlightsSrv.getSelectedRoundTrip() === 'true')
      AirlineName2 = OutReturnSrv.getSelectedReturnFlight().Airline; // return flight

    createStripeToken(AirlineName1);

  }
  var pingIp;
  var flag = true;

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
      if (FlightsSrv.getSelectedRoundTrip() === 'true' && AirlineName2 != AirlineName1)
        paymentInfo.returnFlightId = undefined;
      paymentInfo.paymentToken = response.id;
      paymentSrv.chargeCard(paymentInfo, pingIp)
        .success(function(data) {
          console.log(data);
          if (paymentSrv.getBookingRefNo1() === undefined || paymentSrv.getBookingRefNo1() === null)
            paymentSrv.setBookingRefNo1(data.refNum);
          else
            paymentSrv.setBookingRefNo2(data.refNum);
          //reset stripe key
          getOtherPubKey("IBERIA", function(key) {
            Stripe.setPublishableKey(key);

            if (FlightsSrv.getSelectedRoundTrip() === 'true' && flag &&  AirlineName2 != AirlineName1) {
              flag = false;
              paymentInfo.outgoingFlightId = OutReturnSrv.getSelectedReturnFlight().flightId;
              paymentInfo.cost = OutReturnSrv.getSelectedReturnFlight().cost;
              createStripeToken(AirlineName2);
            }
            else if (data.errorMessage != null || data.errorMessage != undefined)
              alert(data.errorMessage);
            else
              Congrats();
          });
        })
        .error(function(data, status, headers, config) {
          alert(data.errorMessage);
        });
    }
  };

});
