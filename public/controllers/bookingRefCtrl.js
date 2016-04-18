App.controller('bookingRefCtrl', function($scope, FlightsSrv, $location,BookingSrv) {

$scope.bookingRef = paymentSrv.getSelectedCaradNo();
$scope.retreiveBookingRef=function(){
  var input =
  var div = document.getElementById('divID');

  var dec = window.atob(input);
  //var res = "Booking Reference:(please copy it for further tracking): " + "<br>" + enc + "<br>" + "Decoded String: " + dec;
  div.innerHTML = div.innerHTML + input.value+dec.value;
}
});
