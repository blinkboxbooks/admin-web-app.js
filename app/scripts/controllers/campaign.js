'use strict';

/**
 * The Campaign controller shows information about a particular campaign
 **/
angular.module('adminPanelApp').controller('CampaignCtrl', function ($routeParams, $scope, Campaign) {
  $scope.campaignId = +$routeParams.id;
  if($scope.campaignId >= 0){
    $scope.campaignLoading = true;
    $scope.spinnerText = 'Getting Campaign';

    Campaign.get($scope.campaignId).then(function(campaignDetails){
      $scope.campaignLoading = false;
      $scope.campaignDetails = campaignDetails;
    });
  }
});
