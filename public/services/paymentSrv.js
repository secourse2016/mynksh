
App.factory('paymentSrv', function($http) {
    return {
        postPay: function(reservation, bookingRefNumber, flightNumber) {
          console.log('i`m in srv');
          return $http.get('/api/pay/'+ reservation.FName + '/' + reservation.LName + '/' + reservation.passportNo+'/'+reservation.issueDate+'/'+ reservation.expiryDate + '/' + reservation.email + '/' + reservation.phoneno + '/' + bookingRefNumber+'/'+flightNumber);
      },
        getCountry: function() {
            return $http.get('/api/data/airports');
        },
        setSelectedCountry: function(value) {
            this.SelectedCountry = value;
        },
        getSelectedCountry: function(value) {
            this.SelectedCountry = value;
        },

        getSelectedCardType: function() {
            return this.SelectedCardType;
        },
        setSelectedCardType: function(value) {
            this.SelectedCardType = value;
        },
        getSelectedCaradNo: function() {
            return this.SelectedCaradNo;
        },
        setSelectedCaradNo: function(value) {
            this.SelectedCaradNo = value;
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




        getSelectedFirstName: function() {
            return this.selectedFirstName;
        },
        setSelectedFirstName: function(value) {
            this.selectedFirstName = value;
        },
        getSelectedSurname: function() {
            return this.selectedSurname;
        },
        setSelectedSurname: function(value) {
            this.selectedSurname = value;
        },
        getSelectedPassengers: function() {
            return this.SelectedPassengers;
        },
        setSelectedPassengers: function(value) {
            this.SelectedPassengers = value;
        },
        getSelectedStreet: function() {
            return this.selectedStret;
        },
        setselectedStret: function(value) {
            this.selectedStret = value;
        },
        getSelectedinformation: function() {
            return this.Selectedinformation;
        },
        setSelectedinformation: function(value) {
            this.Selectedinformation = value;
        },
        getSelectedPostalcode: function() {
            return this.selectedPostalcode;
        },
        setselectedPostalcode: function(value) {
            this.selectedPostalcode = value;
        },
        getSelectedCity: function() {
            return this.SelectedCity;
        },
        setSelectedCity: function(value) {
            this.SelectedCity = value;
        }

    };
});