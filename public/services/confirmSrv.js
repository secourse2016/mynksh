/**
 * confirmation Service
 */
App.factory('ConfirmSrv', function() {
    return {
        setReservation: function(value) {
            this.reservation = value;
        },
        getReservation: function() {
            return this.reservation;
        }
    };
});
