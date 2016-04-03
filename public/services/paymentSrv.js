/**
 * payment Service
 */
 App.factory('PaymentSrv', function ($http) {
      return {
 				getOutgoingInfo : function() {
            			return $http.get('/api/outgoingInfo');
          	},
          		getReturnInfo : function() {
            			return $http.get('/api/returnInfo');
             }
      };
  });
