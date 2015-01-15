'use strict';

angular.module('adminPanelApp').directive('campaignend', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.campaignend = function(modelValue, viewValue){

        if(ctrl.$isEmpty(modelValue)){
          return scope.campaign.ongoing;
        }

        var startDate = new Date(scope.campaign.startDate);
        var endDate = new Date(viewValue);

        return scope.campaign.ongoing || endDate > startDate;
      };
    }
  };
});
