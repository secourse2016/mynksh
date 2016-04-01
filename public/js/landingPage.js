
$(function(){
    $('.carousel').carousel({
        interval: 300
      });
    $('.carousel-control.right').trigger('click');
});

$(function() {
    $("input:checkbox").on('click', function() {
      // in the handler, 'this' refers to the box clicked on
      var $box = $(this);
      if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        console.log(group);
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
    });
  });

 $(function() {
// var landingPage=angular.module('landingPage',[]);

app.controller("PanelController", function(){
  
  this.tab=1;

  this.selectTab =function(setTab){
    this.tab=setTab;
  };

  this.isSelected = function(checkTab){
    return this.tab === checkTab;
  };

 });
});



