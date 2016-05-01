/* Create Angular App Instance */
App = angular.module('IBERIA', ['ui.bootstrap', 'ngRoute', 'keruC']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: '/partials/landingPage.html',
    controller: 'landingCtrl',
    controllerAs: 'landing'
  })

  .when('/payment', {
    templateUrl: '/partials/payment.html',
    controller: 'paymentCtrl',
    controllerAs: 'payment'
  })

  // route for the OutgoingReturnFlights page
  .when('/flights', {
    templateUrl: '/partials/outgoingReturnFlights.html',
    controller: 'flightsCtrl',
    controllerAs: 'flights'
  })

  // // route for the confirmation page
  .when('/confirm', {
    templateUrl: '/partials/confirmation.html',
    controller: 'confirmCtrl',
    controllerAs: 'sotre'
  })

  // // route for the congrats page

  .when('/congrats', {
    templateUrl: '/partials/congrats.html',
    controller: 'congratsCtrl',
    controllerAs: 'congrats'
  })

  // route for the booking Reference page

  .when('/bookingRef', {
    templateUrl: '/partials/bookingRef.html',
    controller: 'bookingRefCtrl'

  })

  .when('/seatmap/:way', {
    templateUrl: '/partials/seatMap.html',
    controller: 'seatMapCtrl'

  })

  .when('/teamMembers', {
    templateUrl: '/partials/teamMembers.html'

  });


});
