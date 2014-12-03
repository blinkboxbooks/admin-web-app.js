'use strict';

/**
 * The Campaign controller shows information about a particular campaign
 **/
angular.module('adminPanelApp').controller('CampaignCtrl', function ($routeParams, $scope) {
  $scope.campaignId = $routeParams.id;
});
