App.controller('congratsCtrl', function($scope,paymentSrv,OutReturnSrv,$http) {


	$scope.bookingRefNo1 = paymentSrv.getBookingRefNo1();
	$scope.bookingRefNo2 = paymentSrv.getBookingRefNo2();
	$scope.airline1 = OutReturnSrv.getSelectedOutFlight().Airline;
	$scope.airline2 = OutReturnSrv.getSelectedReturnFlight().Airline;
	$scope.urlAirline1=paymentSrv.getOtherAirlineIP($scope.airline1).success (function (airlineIP){data});
	$scope.urlAirline2=paymentSrv.getOtherAirlineIP($scope.airline2).success (function (airlineIP){data});

	console.log($scope.bookingRefNo1);
	console.log($scope.bookingRefNo2);
	console.log($scope.airline1);
	console.log($scope.airline2);



		$scope.getOtherAirlineIP1=function(){
			return $http.get('/data/singleAirline/' + $scope.airline1).success();
		};
		$scope.getOtherAirlineIP2=function(){
			return $http.get('/data/singleAirline/' + $scope.airline2).success();
		};
		//
		console.log($scope.urlAirline1);
		console.log($scope.urlAirline2);
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
