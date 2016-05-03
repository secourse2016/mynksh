App.controller('congratsCtrl', function($scope,paymentSrv, OutReturnSrv) {

	$scope.bookingRefNo1 = paymentSrv.getBookingRefNo1();
	$scope.bookingRefNo2 = paymentSrv.getBookingRefNo2();
	$scope.airline1 = OutReturnSrv.getSelectedOutFlight.Airline;
	$scope.airline2 = OutReturnSrv.getSelectedReturnFlight.Airline;

	console.log($scope.bookingRefNo1);
	console.log($scope.bookingRefNo2);
	console.log($scope.airline1);
	console.log($scope.airline2);
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
