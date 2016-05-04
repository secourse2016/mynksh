App.controller('seatMapCtrl', ['$scope', '$http', 'BookingSrv', '$routeParams', '$location', function($scope, $http, BookingSrv, $routeParams, $location) {

  $scope.way = $routeParams.way;
  if ($scope.way === 'Outgoing'){
    $scope.flightNumber = BookingSrv.getFlight();
    $scope.old = BookingSrv.getOut();
  }
  else{
    $scope.flightNumber = BookingSrv.getFlightOut();
    $scope.old = BookingSrv.getReturn();
  }


  // $scope.flightNumber = 'MYNKSH20';

  $scope.ref = BookingSrv.getSelectedBookingRef();

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
      var state = (seatMap[i - 1].bookingRefNumber === undefined || seatMap[i - 1].bookingRefNumber === null) ? 0 : ( (seatMap[i - 1].bookingRefNumber === $scope.ref) ? 0 : 1);
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

  maxSeatstoBeSelected = $scope.old.length; //FlightsSrv.getTickets();

  $scope.$watch('selectedNodes', function(val) {
    // if ($scope.selectedNodes.length > 3)
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
    if ($scope.selectedNodes.length === maxSeatstoBeSelected) {

      var oldN = [];
      for (var i = 0; i < $scope.old.length; i++)
        oldN.push($scope.old[i].seatNum);

      var newN = [];
      for (var i = 0; i < $scope.selectedNodes.length; i++)
        newN.push($scope.selectedNodes[i].uniqueName);

      var body = {
        "flightNumber": $scope.flightNumber,
        "oldSeats": oldN,
        "newSeats": newN,
        "bookingRefNumber": $scope.ref
      };
      $http.post('/choosingSeat', body).success(function(res) {
        if ($scope.way === "Return") {
          alert(res);
          $location.url('http://52.58.24.76/');
        } else if (BookingSrv.getReturn().length != 0)
          $location.url('/seatmap/Return');
        else {
          alert(res);
          $location.url('http://52.58.24.76/');
        }
      });
    } else {
      alert("You must select same number of tickets");
    }
  };


}]);
