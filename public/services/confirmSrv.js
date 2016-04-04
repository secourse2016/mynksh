/**
 * confirmation Service
 */
 App.factory('ConfirmSrv', function ($http) {
      return {
        setFname: function(value) {
          this.fname = value;
        },
        getFname: function(value) {
          return this.fname;
        },
        setLName: function(value) {
          this.lastName = value;
        },
        getLName: function(value) {
          return this.lastName;
        },
        setIssueDate: function(value) {
          this.issueDate = value;
        },
        getIssueDate: function(value) {
          return this.issueDate;
        },
        setExpiryDate: function(value) {
          this.expiryDate = value;
        },
        getExpiryDate: function(value) {
          return this.expiryDate;
        },
        setEmail: function(value) {
          this.email = value;
        },
        getEmail: function(value) {
          return this.email;
        },
        setPhoneNo: function(value) {
          this.phoneNo = value;
        },
        getPhoneNo: function(value) {
          return this.phoneNo;
        },
        setPassportNo: function(value) {
          this.passportNo = value;
        },
        gePassportNo: function(value) {
          return this.passportNo;
        },
        setPassportType: function(value) {
          this.passportNo = value;
        },
        gePassportType: function(value) {
          return this.passportNo;
        }
      };
  });
