'use strict';

/**
 * The Campaigns controller shows all running campaigns
 **/
angular.module('adminPanelApp').controller('CampaignsCtrl', function ($scope, Campaign, $location, PATHS) {
  $scope.flags = {
    activeFilter: 'all',
    campaignsLoading: true
  };

  var tableData = [];

  var allCampaigns = [];

  $scope.$watch('flags.activeFilter', function(newVal, oldVal){
    if(oldVal !== newVal){
      filterCampaigns(newVal);
    }
  });

  $scope.goToNewCampaign = function goToNewCampaign(){
    $location.path(PATHS.NEW_CAMPAIGN);
  };

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

  $scope.rowClickCallback = function rowClickCallback(row, data){
    var indexOfId = 0;
    $location.path(PATHS.CAMPAIGN + '/' + data[indexOfId]);
  };

  // set up the data table
  $scope.campaignsTable = {
    sDom: '<"H"<"#campaigns-table-select"l>fr>t<"F"ip>',
    rowClickCallback: $scope.rowClickCallback,
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
        'field': function(item){
          return item.startDate ? (new Date(item.startDate)).toString() : '';
        },
        'label': 'Start Date'
      },
      {
        'field': function(item){
          return item.endDate ? (new Date(item.endDate)).toString() : '';
        },
        'label': 'End Date'
      },
      {
        'field': function(item){
          return item.createdAt ? (new Date(item.createdAt)).toString() : '';
        },
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

  $scope.spinnerText = 'Getting Campaigns';
  Campaign.get().then(function(campaignData){
    allCampaigns = campaignData.items || [];
    filterCampaigns($scope.flags.activeFilter);
    $scope.flags.campaignsLoading = false;
  });

});
