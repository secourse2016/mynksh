App.factory('welcomingSrv', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Narihan Ellaithy',
    lastText: 'Front End developer',
    face: 'img/1.jpg'
  }, {
    id: 1,
    name: 'Safa Ads',
    lastText: 'Back End developer',
    face: 'img/2.jpg'
  }, {
    id: 2,
    name: 'Yara Sobhy',
    lastText: 'Back End developer',
    face: 'img/3.jpg'
  }, {
    id: 3,
    name: 'Youssef Radi',
    lastText: 'Front and Back End developer',
    face: 'img/4.jpg'
  }, {
    id: 4,
    name: 'Mohamed Ashraf',
    lastText: 'Back and Front End developer',
    face: 'img/5.jpg'
  },{
    id: 5,
    name: 'Hazem Ayman',
    lastText: 'Front End developer',
    face: 'img/6.jpg'
  },{
    id: 6,
    name: 'Mostafa Ibrahim',
    lastText: 'Front and Back End developer',
    face: 'img/7.jpg'
  }];

  return {
    all: function() {
      return chats;
    }
  };
});
