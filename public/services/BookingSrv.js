App.factory('BookingSrv', function($http) {
  return{

  getSelectedBookingRef: function() {
      return this.SelectedBookingRef;
  },
  setSelectedBookingRef: function(value) {
      this.SelectedBookingRef = value;
  },

}
});
