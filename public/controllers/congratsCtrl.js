App.controller('congratsCtrl', function($scope,paymentSrv) {

	$scope.bookingRefNo1 = paymentSrv.getBookingRefNo1();
	$scope.bookingRefNo2 = paymentSrv.getBookingRefNo2();
	$scope.airline1 = paymentSrv.getAirLine1();
	$scope.airline2 = paymentSrv.getAirLine2();
	$scope.copy = function(){
        var copyTextarea = document.querySelector('.js-copytextarea');
        copyTextarea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    };
});
