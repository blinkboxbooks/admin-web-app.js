'use strict';

/**
 * The edit campaign controller allows editing the campaign given by the url
 **/
angular.module('adminPanelApp').controller('EditCampaignCtrl', function ($routeParams, $scope, Campaign) {
  $scope.campaignId = +$routeParams.id;
  if($scope.campaignId >= 0){
    $scope.campaignLoading = true;
    $scope.spinnerText = 'Getting Campaign';

    // we should probably cache
    Campaign.get($scope.campaignId).then(function(campaign){
      $scope.campaignLoading = false;

      // set up the campaign we will pass to the directive
      $scope.campaign = {
        name: campaign.name,
        description: campaign.description,
        startDate: new Date(campaign.startDate),
        endDate: campaign.endDate ? new Date(campaign.endDate) : '',
        ongoing: !campaign.endDate,
        credit: +campaign.creditAmount.amount,
        redemptionLimit: +campaign.redemptionLimit,
        unlimitedRedemption: !campaign.redemptionLimit,
        enabled: campaign.enabled
      };

    });
  }
});
