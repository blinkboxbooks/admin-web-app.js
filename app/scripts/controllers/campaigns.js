'use strict';

/**
 * The Campaigns controller shows all running campaigns
 **/
angular.module('adminPanelApp').controller('CampaignsCtrl', function ($scope, Campaign, $location, PATHS, $timeout) {
  $scope.activeFilter = 'all';

  var tableData = [];

  var allCampaigns = [];

  $scope.$watch('activeFilter', function(newVal, oldVal){
    if(oldVal !== newVal){
      filterCampaigns(newVal);
    }
  });


  var filterCampaigns = function filterCampaigns(filterType){
    tableData.length = 0; // empty the array, keep refs because of watch
    var now = new Date();
    var filterItems = [];
    switch(filterType){
      case 'all':
        filterItems = allCampaigns;
        break;
      case 'active':
        // active = enabled AND startDate < currentDate AND endDate > currentDate
        filterItems = allCampaigns.filter(function(campaign){
          var start = campaign.startDate ? new Date(campaign.startDate) : undefined;
          var end = campaign.endDate ? new Date(campaign.endDate) : undefined;
          return campaign.enabled && (angular.isUndefined(end) || end > now) && start < now;
        });
        break;
      case 'pending':
        // pending: start > now && enabled
        filterItems = allCampaigns.filter(function(campaign){
          var start = campaign.startDate ? new Date(campaign.startDate) : undefined;
          return campaign.enabled && start > now;
        });
        break;
      case 'expired':
        // expired: end < now
        filterItems = allCampaigns.filter(function(campaign){
          var end = campaign.endDate ? new Date(campaign.endDate) : undefined;
          return end < now;
        });
        break;
      case 'disabled':
        filterItems = allCampaigns.filter(function(campaign){
          return !campaign.enabled;
        });
        break;
    }
    Array.prototype.push.apply(tableData, filterItems);
  };

  var rowClickCallback = function rowClickCallback(row, data){
    var indexOfId = 0;
    $location.path(PATHS.CAMPAIGN + '/' + data[indexOfId]);
  };

  // set up the data table
  $scope.campaignsTable = {
    sDom: '<"H"lfr>t<"F"ip>',
    rowClickCallback: rowClickCallback,
    structure: [
      {
        'field': 'id',
        'label': 'ID'
      },
      {
        'field': 'name',
        'label': 'Name'
      },
      {
        'field': 'description',
        'label': 'Description'
      },
      {
        'field': 'startDate',
        'label': 'Start Date'
      },
      {
        'field': 'endDate',
        'label': 'End Date'
      },
      {
        'field': 'createdAt',
        'label': 'Creation Date'
      },
      {
        'field': function(item){
          return item.enabled ? 'Enabled' : 'Disabled';
        },
        'label': 'Enabled'
      }
    ],
    data: tableData
  };


  $scope.campaignsLoading = true;
  $scope.spinnerText = 'Getting Campaigns...';
  Campaign.get().then(function(campaignData){
    allCampaigns = campaignData.items;
    filterCampaigns($scope.activeFilter);
    $scope.campaignsLoading = false;
  });

});
