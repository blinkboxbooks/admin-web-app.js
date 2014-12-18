'use strict';

describe('Controller: CampaignCtrl', function () {

  var $httpBackend, ROUTES, CampaignCtrl, campaignId;

  // load module
  beforeEach(function(){
    module('adminPanelApp', 'templates', 'mockedResponses');
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $routeParams) {
    campaignId = 99;
    $routeParams.id = '' + campaignId;
    //CampaignCtrl = $controller('CampaignCtrl', {
    //  scope: $rootScope.$new()
    //});
  }));

  it('should get the campaign details for the campaign in routeParams', function () {

  });



});
