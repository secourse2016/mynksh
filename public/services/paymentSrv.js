
App.factory('paymentSrv', function($http) {
    return {

        // postPay: function(reservation, bookingRefNumber, flight , cabin) {
        //   console.log("in service");
        //   return $http.get('/data/pay/'+ reservation.FName + '/' + reservation.LName + '/' + reservation.country + '/' + reservation.passportNo+'/'+
        //     reservation.issueDate+'/'+ reservation.expiryDate + '/' + reservation.email + '/' + reservation.phoneno + '/' + bookingRefNumber+'/'+
        //     flight.flightNumber+'/'+cabin);
        // },
        chargeCard: function(paymentInfo)
        {
            var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
            return $http.post('/booking?wt=' + jwt, paymentInfo);   
        },
        getSelectedCardType: function() {
            return this.SelectedCardType;
        },
        setSelectedCardType: function(value) {
            this.SelectedCardType = value;
        },
        getSelectedCardNo: function() {
            return this.SelectedCardNo;
        },
        setSelectedCardNo: function(value) {
            this.SelectedCardNo = value;
        },
        getSelectedMonth: function() {
            return this.SelectedMonth;
        },
        setSelectedMonth: function(value) {
            this.SelectedMonth = value;
        },
        getSelectedYear: function() {
            return this.SelectedYear;
        },
        setSelectedYear: function(value) {
            this.SelectedYear = value;
        },
        getSelectedCVV: function() {
            return this.SelectedCVV;
        },
        setSelectedCVV: function(value) {
            this.SelectedCVV = value;
        },
        getSelectedStreet: function() {
            return this.selectedStret;
        },
        setSelectedStreet: function(value) {
            this.selectedStret = value;
        },
        getSelectedInformation: function() {
            return this.Selectedinformation;
        },
        setSelectedInformation: function(value) {
            this.Selectedinformation = value;
        },
        getSelectedPostalcode: function() {
            return this.selectedPostalcode;
        },
        setSelectedPostalcode: function(value) {
            this.selectedPostalcode = value;
        },
        getBookingRefNo: function() {
            return this.bookingRefNo;
        },
        setBookingRefNo: function(value) {
            this.bookingRefNo = value;
        },
        getSelectedCity: function() {
            return this.SelectedCity;
        },
        setSelectedCity: function(value) {
            this.SelectedCity = value;
        }

    };
});
