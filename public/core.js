/* Create Angular App Instance */
App = angular.module('iberia', ['ui.bootstrap', 'ngRoute']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the landingPage page
        .when('/', {
            templateUrl : '/partials/landingPage.html',
            controller  : 'LandingCtrl'
        })

        // route for the OutgoingReturnFlights page
        .when('/flights', {
            templateUrl : '/partials/outgoingReturnFlights.html',
            controller  : 'flightsCtrl'
        });

        // route for the OutgoingReturnFlights page
        .when('/confirm', {
            templateUrl : '/partials/confirmation.html',
            controller  : ''
        });

        // route for the Landing page
        .when('/payment', {
            templateUrl : '/partials/payment.html',
            controller  : ''
        });
});
