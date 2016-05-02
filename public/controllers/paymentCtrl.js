App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

    $scope.tab = "active in";
    //$scope.stripeError=false;
    //$scope.stripeErrorDescription="";
    var airlineIP ="52.58.24.76";
    var flight_cost =  0 ;
    var AirlineName1 ="";
    var AirlineName2 = "" ;
    $scope.reservation = ConfirmSrv.getReservation();
    $scope.totalPrice = OutReturnSrv.getSelectedPrice();
    $scope.cabin = FlightsSrv.getSelectedCabin();
    var stripeKey = "" ;
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
        //need here to check if one way or two and put this name attrubute inside createStripeToken method
        if(FlightsSrv.getSelectedRoundTrip() === 'false'){ // if one way
          var AirlineName =OutReturnSrv.getSelectedOutFlight().Airline  ;
          createStripeToken(AirlineName , "out");

        }
        else { // else roundtrip
           AirlineName1  = OutReturnSrv.getSelectedOutFlight().Airline  ;  //  out flight
           AirlineName2 =  OutReturnSrv.getSelectedReturnFlight().Airline  ;  ;  // return flight

            if ((AirlineName1 === AirlineName2 && AirlineName2 === "IBERIA")){
          createStripeToken(AirlineName2,"");

        }   else {

          createStripeToken(AirlineName1,"out");
          createStripeToken(AirlineName2,"");
        }

        }


    };

    // give this methid name and it willl return ip
      function getIpFromName(airlineName) {
        paymentSrv.getSingleairLineIp(airlineName).success(function(airlinesiP) {
          airlineIP = airlinesiP;
        });
      };
      // get pup key
      function getStripeKeyFromName(airlineIP) {
        paymentSrv.getOtherStripePupKey(airlineIP).success(function(airlinesStripeKey) {
          stripeKey = airlinesStripeKey;
        });
      };
    //

    var createStripeToken= function(AirlineName ,outORreturn) {
        Stripe.setPublishableKey('pk_test_fWP8viqFbT95teED8zWD3ieK');
//hna msh 3arf awsl lel airline

      if( !(AirlineName  === "IBERIA")){// if airline name not equal ours get ip of other airline thrn query to get the pupkey then set out stripe pup key
        getIpFromName(AirlineName);
        getStripeKeyFromName(airlineIP);
        Stripe.setPublishableKey(stripeKey);


      }

      console.log("flight : " + flight_cost);

      if(outORreturn === "out"){// if out
        flight_cost = OutReturnSrv.getSelectedOutFlight().cost;
        console.log("flight 2: " + flight_cost) ;
      }
      else {// else return

        flight_cost = OutReturnSrv.getSelectedReturnFlight().cost ;


console.log("flight 3 : " + flight_cost) ;
      }
      if ( (!(outORreturn  === "out")) &&(AirlineName1 === AirlineName2 && AirlineName2 === "IBERIA")){
                 console.log("inside of " + OutReturnSrv.getSelectedReturnFlight().cost) ;
                 console.log("inside of " + (OutReturnSrv.getSelectedOutFlight().cost)) ;
        flight_cost = (OutReturnSrv.getSelectedReturnFlight().cost)+ (OutReturnSrv.getSelectedOutFlight().cost) ;

console.log("inside of ") ;
      }
      console.log("flight 4 : " + flight_cost) ;
        Stripe.card.createToken({

            "number": paymentSrv.getSelectedCardNo().toString(),
            "cvc": paymentSrv.getSelectedCVV(),
            "exp_month": paymentSrv.getSelectedMonth(),
            "exp_year": paymentSrv.getSelectedYear()
            }, stripeResponseHandler);
    };
    var stripeResponseHandler= function(status, response){
        if (response.error)
            alert(response.error.message);
        else
        {
           var returnFlightId;
           if (FlightsSrv.getSelectedRoundTrip() === 'true')
               returnFlightId= OutReturnSrv.getSelectedReturnFlight().flightId;
           var paymentInfo =
           {
                "passengerDetails":[{

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
                "cost": flight_cost * 100,
                "outgoingFlightId":  OutReturnSrv.getSelectedOutFlight().flightId,
                "returnFlightId": returnFlightId,
                "paymentToken": response.id ,
                "IP":  airlineIP
            }
           paymentSrv.chargeCard(paymentInfo)
           .success(function(data, status, headers, config) {
                console.log(data);
                paymentSrv.setBookingRefNo(data.refNum);
                //reset stripe key
                      Stripe.setPublishableKey('pk_test_fWP8viqFbT95teED8zWD3ieK');


                Congrats();

                console.log(paymentInfo);
            });
       }

    };
    //NARIHAN
    $scope.getBookingRef = function() {
        //encode and get the first part of the outgoing date
        var card = $scope.selectedCardNumber;
        //
        var outFlightNo = OutReturnSrv.getSelectedOutFlight().flightNumber;
        var str = card + "," + outFlightNo;
        var enc = window.btoa(str);
        var dec = window.atob(enc);

        var res = enc;

        // "<br>" + "Decoded String: " + dec;
        document.getElementById("ptag").innerHTML = "Booking Reference:(please copy it for further tracking):" + "<br>";
        document.getElementById("demo").innerHTML = res;

        var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

        copyTextareaBtn.addEventListener('click', function(event) {
            var copyTextarea = document.querySelector('.js-copytextarea');
            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        });
        return enc;
    };

    //End of Narihan

});
