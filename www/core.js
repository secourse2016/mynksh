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

  .state('index', {
    url: '/',
    templateUrl: '/partials/main.html',
    controller: ''
  })

  .state('flights', {
    url: '/flights',
    templateUrl: '/partials/flights.html',
    controller: ''
  })

  .state('payment', {
    url: '/payment',
    templateUrl: '/partials/payment.html',
    controller: ''
  })

  // route for the confirmation page
  .state('confirm', {
    url: '/confirm',
    templateUrl: '/partials/confirm.html',
    controller: ''
  })

  // route for the congrats page
  .state('congrats', {
    url: '/congrats',
    templateUrl: '/partials/congrats.html',
    controller: ''
  })

  // route for the booking Reference page
  .state('bookingRef', {
    url: '/bookingRef',
    templateUrl: '/partials/bookingRef.html',
    controller: ''
  });

  $urlRouterProvider.otherwise('/#');

});
