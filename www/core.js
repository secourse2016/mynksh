/* Create Angular App Instance */
App = angular.module('IBERIA', ['ionic']);

App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

/**
 * Angular Routes
 */
App.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/home',
    abstract: true,
    templateUrl: 'partials/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.book', {
    url: '/book',
    views: {
      'tab-dash': {
        templateUrl: 'partials/main.html',
        controller: 'landingCtrl'
      }
    }
  })

  .state('tab.offers', {
    url: '/offers',
    views: {
      'tab-chats': {
        templateUrl: 'partials/offers.html',
        controller: 'landingCtrl'
      }
    }
  })

  .state('tab.AboutUs', {
    url: '/AboutUs',
    views: {
      'tab-account': {
        templateUrl: 'partials/AboutUs.html',
        controller: 'landingCtrl'
      }
    }
  })

  .state('flights', {
    url: '/flights',
    templateUrl: 'partials/flights.html',
    controller: 'flightsCtrl'
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/book');

});
