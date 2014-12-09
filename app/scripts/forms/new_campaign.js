'use strict';

angular.module('adminPanelApp')
  .directive('newCampaignForm', function(Campaign, PATHS, ROUTES, $location) {
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
          startDate: new Date(),
          endDate: '',
          ongoing: true,
          credit: '',
          redemptionLimit: null,
          unlimitedRedemption: true,
          enabled: true
        };

        $scope.createCampaign = function createCampaign(campaign){
          if($scope.campaignForm.$invalid){
            return false;
          }
          Campaign.post({
            name: campaign.name,
            description: campaign.description,
            enabled: campaign.enabled,
            startDate: (new Date(campaign.startDate)).toISOString(),
            endDate: (!campaign.ongoing && campaign.endDate) ? (new Date(campaign.endDate)).toISOString() : undefined,
            creditAmount: {
              currency: 'GBP',
              amount: +campaign.credit
            },
            redemptionLimit: (!campaign.unlimitedRedemption && campaign.redemptionLimit) ? +campaign.redemptionLimit : undefined
          }).then(function(location){
            var newCampaignId = location.split(ROUTES.CAMPAIGNS + '/')[1];
            $location.path(PATHS.CAMPAIGN + '/' + newCampaignId);
          });
        };
      }
    };
  });
