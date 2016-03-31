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
            controller  : 'mainCtrl'
        })

        // route for the Landing page
        .when('/flights', {
            templateUrl : '/partials/outgoingReturnFlights.html',
            controller  : 'flightsCtrl'
        });
});
