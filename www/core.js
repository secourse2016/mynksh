/* Create Angular App Instance */

App = angular.module('IBERIA', ['ionic', 'onezone-datepicker', 'ui.router', 'ngMaterial']);

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

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}

/**
 * Angular Routes
 */
App.config(function($stateProvider, $urlRouterProvider, $mdIconProvider,$mdDateLocaleProvider) {

  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('D/M/YYYY');
  };

  $stateProvider


  // setup an abstract state for the tabs directive
    .state('welcome', {
    url: '/',
    templateUrl: '/partials/payment.html',
    controller: 'welcomingCtrl'
  })

  .state('tabs', {
    url: '/home',
    templateUrl: 'partials/tabs.html',
    controller: 'tabsCtrl'
  })
  .state('chat-detail', {
      url: '/chat-detail/:chatId',

          templateUrl: 'partials/teamMemberDetails.html',
          controller: 'ChatDetailCtrl'

    })

  // Each tab has its own nav history stack:

  .state('landing', {
    url: '/book',
    templateUrl: 'partials/main.html',
    controller: 'landingCtrl'
  })

  .state('offer', {
    url: '/offers',
    templateUrl: 'partials/offers.html',
    controller: 'landingCtrl'
  })

  .state('AboutUs', {
    url: '/AboutUs',
    templateUrl: 'partials/AboutUs.html',
    controller: 'landingCtrl'
  })

  .state('flights', {
    url: '/flights',
    templateUrl: 'partials/flights.html',
    controller: 'flightsCtrl'
  })

  .state('confirm', {
    url: '/confirm',
    templateUrl: 'partials/confirmation.html',
    controller: 'confirmCtrl'
  })
  .state('payment', {
    url: '/payment',
    templateUrl: '/partials/payment.html',
    controller: 'paymentCtrl'
  })

  // // route for the congrats page
  .state('congrats', {
    url: '/congrats',
    templateUrl: '/partials/congrats.html',
    controller: 'congratsCtrl'
  })
  //
  // // route for the booking Reference page
  .state('bookingRef', {
    url: '/bookingRef',
    templateUrl: '/partials/bookingRef.html',
    controller: 'bookingRefCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
