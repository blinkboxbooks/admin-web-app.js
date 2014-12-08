'use strict';

angular.module('adminPanelApp')
  .directive('newCampaignForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/new_campaign_form.html',
      scope: {
        'user': '='
      },
      replace: true,
      controller: function($scope){
        $scope.campaign = {
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          ongoing: true,
          credit: 0,
          redemptionLimit: 0,
          unlimitedRedemption: true,
          enabled: true
        };

        $scope.createCampaign = function createCampaign(campaign){
        };
      }
    };
  });
