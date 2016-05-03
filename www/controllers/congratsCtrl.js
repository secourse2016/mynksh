App.controller('congratsCtrl', function($scope,$location,paymentSrv) {
	$scope.bookingRefNo = paymentSrv.getBookingRefNo();
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
		$scope.landing = function() {
				$location.url('/home');
		};

});
