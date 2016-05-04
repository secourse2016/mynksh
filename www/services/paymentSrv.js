App.factory('paymentSrv', function($http) {
  return {
    getOtherAirlineIP: function(airlineName) {
      return $http.get('http://localhost:8080/data/singleAirline/' + airlineName)
    },
    getOtherStripePubKey: function(airlineIP) {
      jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
      if (airlineIP === "Iberia")
        return $http.get('http://localhost:8080/stripe/pubkey/?wt=' + jwt);
      else {
        return $http.get('http://' + airlineIP + '/stripe/pubkey/?wt=' + jwt, {
          timeout: 3000
        });
      }
    },
    chargeCard: function(paymentInfo, pingIp) {
      var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
      if (pingIp === "")
        pingIp = "http://localhost:8080";
      return $http.post(pingIp + '/booking?wt=' + jwt, paymentInfo, {
        timeout: 3000
      });
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
    getBookingRefNo1: function() {
      return this.bookingRefNo1;
    },
    setBookingRefNo1: function(value) {
      this.bookingRefNo1 = value;
    },
    getBookingRefNo2: function() {
      return this.bookingRefNo2;
    },
    setBookingRefNo2: function(value) {
      this.bookingRefNo2 = value;
    },
    getAirLine1: function() {
      return this.getAirLine1;
    },
    setAirLine1: function(value) {
      this.getAirLine1 = value;
    },
    getAirLine2: function() {
      return this.getAirLine2;
    },
    setAirLine2: function(value) {
      this.getAirLine2 = value;
    }
  };
});
