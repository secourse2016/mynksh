/* Create Angular App Instance */
App = angular.module('iberia', ['ui.bootstrap', 'ngRoute']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the index page
        .when('/', {
            templateUrl : '/partials/index.html',
            controller  : 'mainCtrl'
        })

        // route for the Landing page
        .when('/flights', {
            templateUrl : '/partials/landingPage.html',
            controller  : 'flightsCtrl'
        });
});
