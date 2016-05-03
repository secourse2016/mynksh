/**
 * confirmation Service
 */
App.factory('ConfirmSrv', function($http) {
    return {
        setReservations: function(value) {
            this.reservation = value;
        },
        getReservations: function() {
            return this.reservation;
        }
    };
});
