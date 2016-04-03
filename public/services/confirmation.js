/**
 * confirmation Service
 */
 App.factory('paymentSrv', function ($http) {
      return {
        setFname: function(value) {
          this.Fname = value;
        },
        getFname: function(value) {
          return this.Fname;
        },
        setLName: function(value) {
          this.lastName = value;
        },
        getLName: function(value) {
          return this.lastName;
        },
        setIssueDate: function(value) {
          this.IssueDate = value;
        },
        getIssueDate: function(value) {
          return this.IssueDate;
        },
        setExpiryDate: function(value) {
          this.ExpiryDate = value;
        },
        getExpiryDate: function(value) {
          return this.ExpiryDate;
        },
        setEmail: function(value) {
          this.Email = value;
        },
        getEmail: function(value) {
          return this.Email;
        },
        setPhoneNo: function(value) {
          this.PhoneNo = value;
        },
        getPhoneNo: function(value) {
          return this.PhoneNo;
        },
        setPassportNo: function(value) {
          this.PassportNo = value;
        },
        gePassportNo: function(value) {
          return this.PassportNo;
        }

      };
  });