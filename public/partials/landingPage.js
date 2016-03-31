


(function() {

var landingPage=angular.module('landingPage',[]);

app.controller("PanelController", function()){
  this.tab=1;

  this.selectTab =function(setTab){
    this.tab=setTab;
  };

  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  };
});


 var value = element(by.binding('example.value | date: "yyyy-MM-dd"'));
 var valid = element(by.binding('myForm.input.$valid'));
 var input = element(by.model('example.value'));

 // currently protractor/webdriver does not support
 // sending keys to all known HTML5 input controls
 // for various browsers (see https://github.com/angular/protractor/issues/562).

 function dateCtrl(val) {
   // set the value of the element and force validation.
   var scr = "var ipt = document.getElementById('exampleInput'); " +
   "ipt.value = '" + val + "';" +
   "angular.element(ipt).scope().$apply(function(s) { s.myForm[ipt.name].$setViewValue('" + val + "'); });";
   browser.executeScript(scr);
 }

 it('should initialize to model', function() {
   expect(value.getText()).toContain('2013-10-22');
   expect(valid.getText()).toContain('myForm.input.$valid = true');
 });

 it('should be invalid if empty', function() {
   setInput('');
   expect(value.getText()).toEqual('value =');
   expect(valid.getText()).toContain('myForm.input.$valid = false');
 });

 it('should be invalid if over max', function() {
   setInput('2015-01-01');
   expect(value.getText()).toContain('');
   expect(valid.getText()).toContain('myForm.input.$valid = false');
 });

// (function () {
// 'use strict';
// angular
//     .module('autocompleteDemo', ['ngMaterial'])
//     .controller('DemoCtrl', DemoCtrl);
// function DemoCtrl ($timeout, $q, $log) {
//   var self = this;
//   self.simulateQuery = false;
//   self.isDisabled    = false;
//   // list of `state` value/display objects
//   self.states        = loadAll();
//   self.querySearch   = querySearch;
//   self.selectedItemChange = selectedItemChange;
//   self.searchTextChange   = searchTextChange;
//   self.newState = newState;
//   function newState(state) {
//     alert("Sorry! You'll need to create a Constituion for " + state + " first!");
//   }
//   // ******************************
//   // Internal methods
//   // ******************************
//   /**
//    * Search for states... use $timeout to simulate
//    * remote dataservice call.
//    */
//   function querySearch (query) {
//     var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
//         deferred;
//     if (self.simulateQuery) {
//       deferred = $q.defer();
//       $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//       return deferred.promise;
//     } else {
//       return results;
//     }
//   }
//   function searchTextChange(text) {
//     $log.info('Text changed to ' + text);
//   }
//   function selectedItemChange(item) {
//     $log.info('Item changed to ' + JSON.stringify(item));
//   }
//   /**
//    * Build `states` list of key/value pairs
//    */
//   function loadAll() {
//     var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
//             Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
//             Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
//             Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
//             North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
//             South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
//             Wisconsin, Wyoming';
//     return allStates.split(/, +/g).map( function (state) {
//       return {
//         value: state.toLowerCase(),
//         display: state
//       };
//     });
//   }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
}
})();
