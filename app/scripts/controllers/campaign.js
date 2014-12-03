'use strict';

/**
 * The Campaign controller shows information about a particular campaign
 **/
angular.module('adminPanelApp').controller('CampaignCtrl', function ($routeParams, $scope, Campaign) {
  $scope.campaignId = +$routeParams.id;
  if($scope.campaignId >= 0){
    Campaign.get($scope.campaignId).then(function(campaignDetails){
      $scope.campaignDetails = campaignDetails;
    });
  }
});
