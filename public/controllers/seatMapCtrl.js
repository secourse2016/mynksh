App.controller('seatMapCtrl', ['$scope', '$http', 'OutReturnSrv', '$routeParams', function($scope, $http, OutReturnSrv,$routeParams) {

  // $scope.flightNumber = OutReturnSrv.setSelectedOutFlight.flightNumber;
  $scope.flightNumber = 'MYNKSH20';
  $scope.cabin = 'business';
  $scope.way = $routeParams.way;
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
      var state = (seatMap[i - 1].Cabin === $scope.cabin) ? ((seatMap[i - 1].bookingRefNumber === undefined) ? 0 : 1) : 3;
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


  $scope.selectedNodes = [];

  $scope.userEvent = '--';

  $scope.nodeSelected = function(node) {
    $scope.userEvent = 'user selected ' + node.displayName;
    $scope.$apply();
    if ($scope.selectedNodes.length > $scope.tickets){
      $scope.nodeDeselected(node);
      console.log('kefaia 7aram');
    }
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
}]);
