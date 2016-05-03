App.factory('paymentSrv', function($http) {
  return {

    getOtherAirlineIP: function(airlineName) {
      return $http.get('/data/singleAirline/' + airlineName)
    },
    getOtherStripePubKey: function(airlineIP) {
      jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
      if (airlineIP === "IBERIA")
        return $http.get('/stripe/pubkey/?wt=' + jwt);
      else {
        return $http.get('http://' + airlineIP + '/stripe/pubkey/?wt=' + jwt);
      }
    },
    chargeCard: function(paymentInfo, pingIp) {
      var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
      return $http.post(pingIp + '/booking?wt=' + jwt, paymentInfo);
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
    getBookingRefNo: function() {
      return this.bookingRefNo;
    },
    setBookingRefNo: function(value) {
      this.bookingRefNo = value;
    }
  };
});
