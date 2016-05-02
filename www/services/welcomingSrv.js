App.factory('welcomingSrv', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Narihan Ellaithy',
    lastText: 'Front End developer',
    gender: 'Female',
    facebook: 'Narihan Ellaithy',
    instagram: '@narihanellaithy',
    phone:'N/A',
    status:'Life is too short for this',
    num: 900,
    face: 'img/1.jpg',
    flip:'img/queen.gif'
  }, {
    id: 1,
    name: 'Safa Ads',
    lastText: 'Back End developer',
    gender: 'Female',
    facebook: 'Safa Ads',
    instagram: '@safaads',
    phone:'N/A',
    status:'الحياه جميله مع القهوه و فيروز',
    num: 90,
    face: 'img/2.jpg',
    flip:'img/coffee.gif'
  }, {
    id: 2,
    name: 'Yara Sobhy',
    lastText: 'Back End developer',
    gender: 'Female',
    facebook: 'Yara Sobhy',
    instagram: '@yarasobhy',
    status:'See you tomorrow ya Kefahy',
    phone:'N/A',
    num: 10,
    face: 'img/3.jpg',
    flip:'img/flipHair.gif'
  }, {
    id: 3,
    name: 'Youssef Radi',
    lastText: 'Front and Back End developer',
    gender: 'Male',
    facebook: 'Youssuf Radi',
    instagram: '@youssufradi',
    status:'I do not change your code #IDo, malek bas ya safa222222?!',
    phone:'+20 100 060 4877',
    num: 0,
    face: 'img/4.jpg',
    flip:'img/angry2.gif'
  }, {
    id: 4,
    name: 'Mohamed Ashraf',
    lastText: 'Back and Front End developer',
    gender: 'Male',
    facebook: 'Mohamed Ashraf',
    instagram: 'N/A',
    phone:'N/A',
    num: 5,
    status:'************...teeeettt.',
    face: 'img/5.jpg',
    flip:'img/angry.gif'
  },{
    id: 5,
    name: 'Hazem Ayman',
    lastText: 'Front End developer',
    phone:'N/A',
    gender: 'Male',
    facebook: 'Hazem Ayman',
    status:'Not available... begad',
    instagram: 'N/A',
    num: 5,
    face: 'img/6.jpg',
    flip:'img/chill.gif'
  },{
    id: 6,
    name: 'Mostafa Ibrahim',
    lastText: 'Front and Back End developer',
    gender: 'Male',
    facebook: 'Mostafa Ibrahim',
    status:'complicated stuff...',
    instagram: 'N/A',
    num: 5,
    phone:'N/A',
    face: 'img/7.jpg',
    flip:'img/complicated.gif'
  }];

  return {
    all: function() {
      return chats;
    },get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
