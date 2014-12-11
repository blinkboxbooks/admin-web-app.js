'use strict';

angular.module('adminPanelApp').directive('aftertoday', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.aftertoday = function(modelValue, viewValue){
        if(ctrl.$isEmpty(modelValue)){
          return true;
        }

        var startDate = new Date(viewValue);
        var today = new Date();
        today.setHours(0, 0, 0, 0); // today at 00:00:00.00

        return !scope.editing && startDate >= today;
      };
    }
  };
});
