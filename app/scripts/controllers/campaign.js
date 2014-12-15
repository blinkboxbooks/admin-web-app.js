'use strict';

/**
 * The Campaign controller shows information about a particular campaign
 **/
angular.module('adminPanelApp').controller('CampaignCtrl', function ($routeParams, $scope, Campaign, $location, PATHS) {
  $scope.campaignId = +$routeParams.id;
  if($scope.campaignId >= 0){
    $scope.campaignLoading = true;
    $scope.spinnerText = 'Getting Campaign';

    var campaignTypes = {
      'CreditCampaign': 'Credit Campaign'
    };

    Campaign.get($scope.campaignId).then(function(campaignDetails){
      $scope.campaignLoading = false;
      if(campaignDetails.endDate){
        var start = new Date(campaignDetails.startDate);
        var end = new Date(campaignDetails.endDate);
        var now = new Date();
        var totalDuration = end - start;
        var nowDuration = now - start;
        campaignDetails.daysRemaining = Math.floor((totalDuration - nowDuration) / 86400000);
      }

      campaignDetails.typeFormatted = campaignTypes[campaignDetails.type] || campaignDetails.type;

      campaignDetails.redemptionPercentage = Math.floor(campaignDetails.totalRedeemedVoucherCount / campaignDetails.totalVoucherCount * 100);
      campaignDetails.redemptionPercentage = campaignDetails.redemptionPercentage < 100 ? campaignDetails.redemptionPercentage : 100;

      $scope.campaignDetails = campaignDetails;
    });

    $scope.editCampaign = function(){
      $location.path(PATHS.CAMPAIGN + '/' + $scope.campaignId + '/edit');
    };
  }
});
