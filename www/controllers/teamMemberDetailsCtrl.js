App.controller('ChatDetailCtrl', function($scope, $stateParams, welcomingSrv) {
  $scope.chat = welcomingSrv.get($stateParams.chatId);
});
