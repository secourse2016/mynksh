App.controller('seatMapCtrl', ['$scope', '$http', 'OutReturnSrv', '$routeParams', 'FlightsSrv', '$location', function($scope, $http, OutReturnSrv, $routeParams, FlightsSrv, $location) {

  // $scope.roundTrip = FlightsSrv.getSelectedRoundTrip();
  $scope.way = $routeParams.way;
  // if ($scope.way === 'Outgoing')
  // $scope.flightNumber = OutReturnSrv.getSelectedReturnFlight().flightNumber;
  // else
  // $scope.flightNumber = OutReturnSrv.getSelectedReturnFlight().flightNumber;

  $scope.flightNumber = 'MYNKSH20';
  $scope.roundTrip = 'true';

  $scope.cabin = 'business';


  $http.get('/data/seatMap/' + $scope.flightNumber).success(function(seatMap) {
    $scope.seatsData = $scope.Map(seatMap);
  });

  $scope.Map = function(seatMap) {
    var seatsData = {};
    seatsData.rows = [];
    var rowName = 1;
    var nodes = [];
    var emptyNode = {
      "type": 0,
      "uniqueName": null,
      "displayName": null,
      "selected": 0
    };
    for (var i = 1; i < seatMap.length + 1; i++) {
      var state = (seatMap[i - 1].bookingRefNumber === undefined) ? ((seatMap[i - 1].Cabin === $scope.cabin) ? 0 : 3) : 1;
      var node = {
        "type": 1,
        "uniqueName": seatMap[i - 1].seatNum,
        "displayName": seatMap[i - 1].seatNum,
        "selected": state
      };
      // console.log(node);
      nodes.push(node);

      if (i != 0 && seatMap[i - 1].Cabin != 'economy' && i % 6 === 0) {
        seatsData.rows.push({
          "rowName": rowName,
          "nodes": nodes
        });
        rowName += rowName + 1;
        nodes = [];
      } else if (i != 0 && seatMap[i - 1].Cabin === 'economy' && i % 8 === 0) {
        seatsData.rows.push({
          "rowName": rowName,
          "nodes": nodes
        });
        rowName = rowName + 1;
        nodes = [];
      } else if (i != 0 && i % 2 === 0) {
        nodes.push(emptyNode);
      }
    };
    return seatsData;
  }

  maxSeatstoBeSelected = 3;//FlightsSrv.getTickets();

  $scope.$watch('selectedNodes', function(val) {
    // if ($scope.selectedNodes.length > 3)
      console.log(val);
  });


  $scope.selectedNodes = [];

  $scope.userEvent = '--';

  $scope.nodeSelected = function(node) {
    $scope.userEvent = 'user selected ' + node.displayName;
    $scope.$apply();

  };

  $scope.nodeDeselected = function(node) {
    $scope.userEvent = 'user deselected ' + node.displayName;
    $scope.$apply();

  };

  $scope.nodeDisallowedSelected = function(node) {
    $scope.userEvent = 'user attempted to select occupied seat ' + node.displayName;
    $scope.$apply();

    if (node.selected === 3)
      alert('Sorry but this seat is to be reserved for another Class : ' + node.displayName);
    else
      alert('This seat is already reserved : ' + node.displayName);
  };

  $scope.Reserve = function() {
    if ($scope.way === 'Outgoing')
      OutReturnSrv.setSelectedOutgoingSeat($scope.selectedNodes);
    else
      OutReturnSrv.setSelectedReturnSeat($scope.selectedNodes);
    if ($scope.roundTrip && OutReturnSrv.getSelectedReturnFlight().Airline === 'IBERIA')
      $location.url('/seatmap/Return');
    else
      $location.url('/confirm');
  };


}]);
