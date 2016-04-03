/**
 * payment Service
 */
 App.factory('paymentSrv', function ($http) {
      return {
        getCountry : function() {
          return $http.get('/api/data/airports');
        } ,
        setSelectedCountry: function(value) {
          this.setSelectedCountry = value;
        },
        getSelectedCountry: function(value) {
          this.getSelectedCountry = value;
        },
        getFirstName : function() {
          return this.FirstName ;
        },
        setFirstName: function(value) {
          this.FirstName = value;
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
