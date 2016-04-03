/* Create Angular App Instance */
App = angular.module('IBERIA', ['ui.bootstrap', 'ngRoute']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the landingPage page
        .when('/', {
            templateUrl : '/partials/landingPage.html',
            controller  : 'landingCtrl',
            controllerAs: 'landing'
        })
        .when('/payment', {
            templateUrl : '/partials/payment.html',
            controller  : 'paymentCtrl',
            controllerAs: 'payment'
        })

        // route for the OutgoingReturnFlights page
        .when('/flights', {
            templateUrl : '/partials/outgoingReturnFlights.html',
            controller  : 'flightsCtrl',
            controllerAs: 'flights'
        });


});
