'use strict';

/**
 * The Campaign controller shows information about a particular campaign
 **/
angular.module('adminPanelApp').controller('CampaignCtrl', function ($routeParams, $scope, Campaign, $location, PATHS, ngDialog, $rootScope, Popup) {
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

    $scope.enableCampaign = function(){
      return Popup.confirm('Are you sure you want to enable this campaign?').then(function(){
        Campaign.setEnabled($scope.campaignId, true).then(function(){
          $scope.campaignDetails.enabled = true;
        }, function(error){
          Popup.alert('There was a problem on the server while enabling the campaign. Please try again.');
          console.error(error);
        });
      });
    };

    $scope.disableCampaign = function(){
      return Popup.confirm('Are you sure you want to disable this campaign?').then(function(){
        Campaign.setEnabled($scope.campaignId, false).then(function(){
          $scope.campaignDetails.enabled = false;
        }, function(error){
          Popup.alert('There was a problem on the server while disabling the campaign. Please try again.');
          console.error(error);
        });
      });
    };
  }
});
