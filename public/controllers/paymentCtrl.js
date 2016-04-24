App.controller('paymentCtrl', function($scope, FlightsSrv, ConfirmSrv, OutReturnSrv, paymentSrv, $location) {

    $scope.tab = "active in";
    $scope.reservation = ConfirmSrv.getReservation();
    $scope.totalPrice = OutReturnSrv.getSelectedPrice();
    $scope.cabin = FlightsSrv.getSelectedCabin();
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

    var postAPay = function() {
        $scope.bookingRefNumber = $scope.getBookingRef();
        if (roundTrip == 'true')
            paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, outgoingFlight, returnFlight, $scope.cabin);
        else 
            paymentSrv.postPay($scope.reservation, $scope.bookingRefNumber, outgoingFlight, $scope.cabin);
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



        //     document.getElementById("copyButton").addEventListener("click", function() {
        //     copyToClipboard(enc);
        //     });

        // function copyToClipboard(elem) {
        //       // create hidden text element, if it doesn't already exist
        //     var targetId = "_hiddenCopyText_";
        //     var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
        //     var origSelectionStart, origSelectionEnd;
        //     if (isInput) {
        //         // can just use the original source element for the selection and copy
        //         target = elem;
        //         origSelectionStart = elem.selectionStart;
        //         origSelectionEnd = elem.selectionEnd;
        //     } else {
        //         // must use a temporary form element for the selection and copy
        //         target = document.getElementById(targetId);
        //         if (!target) {
        //             var target = document.createElement("textarea");
        //             target.style.position = "absolute";
        //             target.style.left = "-9999px";
        //             target.style.top = "0";
        //             target.id = targetId;
        //             document.body.appendChild(target);
        //         }
        //         target.textContent = elem.textContent;
        //     }
        //     // select the content
        //     var currentFocus = document.activeElement;
        //     target.focus();
        //     target.setSelectionRange(0, target.value.length);

        //     // copy the selection
        //     var succeed;
        //     try {
        //           succeed = document.execCommand("copy");
        //     } catch(e) {
        //         succeed = false;
        //     }
        //     // restore original focus
        //     if (currentFocus && typeof currentFocus.focus === "function") {
        //         currentFocus.focus();
        //     }

        //     if (isInput) {
        //         // restore prior selection
        //         elem.setSelectionRange(origSelectionStart, origSelectionEnd);
        //     } else {
        //         // clear temporary content
        //         target.textContent = "";
        //     }
        //     return succeed;
        //     }


        return enc;
    };

    //End of Narihan


});
