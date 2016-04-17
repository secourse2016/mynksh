/**
 * confirmation Service
 */
App.factory('ConfirmSrv', function($http) {
    return {
        setReservation: function(value) {
            this.reservation = value;
        },
        getReservation: function() {
            return this.reservation;
        },
        setEmail: function(value) {
            this.Email = value;
        },
        getEmail: function() {
            return this.Email;
        },
        setPhoneNo: function(value) {
            this.phoneNo = value;
        },
        getPhoneNo: function() {
            return this.phoneNo;
        }
    };
});
