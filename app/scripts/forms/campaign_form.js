'use strict';

angular.module('adminPanelApp')
  .directive('campaignForm', function(Campaign, PATHS, ROUTES, $location, $animate, ngDialog, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/campaign_form.html',
      scope: {
        'edit': '='
      },
      replace: true,
      controller: function($scope){
        $scope.editing = !!$scope.edit;
        $scope.campaign = $scope.editing ? $scope.edit : {
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

        $scope.isInvalid = function isInvalid(fieldName, validatorName){
          var form = $scope.campaignForm;
          return (form.$submitted || form[fieldName].$touched) && form[fieldName].$error[validatorName];
        };

        $scope.submitCampaign = function submitCampaign(campaignInput){
          if($scope.campaignForm.$invalid){
            return false;
          }

          return ngDialog.openConfirm({
            template: $rootScope.templates.confirmCampaignPopup,
            scope: $scope
          }).then(function(){
            var campaignData = {
              name: campaignInput.name,
              description: campaignInput.description,
              enabled: campaignInput.enabled,
              endDate: (!campaignInput.ongoing && campaignInput.endDate) ? (new Date(campaignInput.endDate)).toISOString() : undefined
            };

            if($scope.editing){
              return editCampaign(campaignInput.id, campaignData);
            } else {
              campaignData.startDate = (new Date(campaignInput.startDate)).toISOString();
              campaignData.redemptionLimit = (!campaignInput.unlimitedRedemption && campaignInput.redemptionLimit) ? +campaignInput.redemptionLimit : undefined;
              campaignData.creditAmount = {
                currency: 'GBP',
                amount: +campaignInput.credit
              };
              return createCampaign(campaignData);
            }
          });
        };

        var createCampaign = function createCampaign(campaignData){
          return Campaign.post(campaignData).then(function(location){
            var newCampaignId = location.split(ROUTES.CAMPAIGNS + '/')[1];
            $location.path(PATHS.CAMPAIGN + '/' + newCampaignId);
          }, function(error){
            $scope.serverError = error;
          });
        };

        var editCampaign = function editCampaign(id, campaignData){
          return Campaign.put(id, campaignData).then(function(){
            // todo should put a message saying it was edited.
            $location.path(PATHS.CAMPAIGN + '/' + id);
          }, function(error){
            $scope.serverError = error;
          });
        };
      },
      link: function(scope, element){
        $animate.enabled(false, element);
      }
    };
  });
