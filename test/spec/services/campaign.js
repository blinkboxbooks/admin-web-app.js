'use strict';

describe('Service: Campaign', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200);
			$httpBackend.whenGET(_ROUTES_.SESSION).respond(200);
		});
	});

	var $rootScope, Campaign, CampaignsData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _Campaign_, _CampaignsData_){
		$rootScope = _$rootScope_;
		Campaign = _Campaign_;
		CampaignsData = $.extend({}, _CampaignsData_);
	}));

	it('Should return campaign data', function(){
		var id = 1, campaign, error;

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + id).respond(200, CampaignsData.items[0]);

		Campaign.get(id).then(function(data){
			campaign = data;
		});

		expect(campaign).toBeUndefined();

		$httpBackend.flush();

		expect(campaign).toEqual(CampaignsData.items[0]);

		// Handling invalid campaign code
		campaign = undefined;
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + 999).respond(404);

		Campaign.get(999).then(function(data){
			campaign = data;
		}, function () {
			error = true;
		});

		expect(campaign).toBeUndefined();
		$httpBackend.flush();
		expect(campaign).toBeUndefined();
		expect(error).toBeTruthy();
	});

	it('Should return campaigns data', function(){
		var campaigns;

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '?count=999').respond(200, CampaignsData);

		Campaign.get().then(function(data){
			campaigns = data;
		});

		expect(campaigns).toBeUndefined();

		$httpBackend.flush();

		expect(campaigns).toEqual(CampaignsData);
	});

  it('should POST to create a new campaign', function () {
    var campaign = {
      'name' : 'Sample Campaign',
      'description' : 'A very simple test campaign',
      'enabled' : true,
      'startDate' : '2014-12-18T14:00:22.478Z',
      'creditAmount' : {
        'currency' : 'GBP',
        'amount' : 23
      }
    };

    $httpBackend.expectPOST(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS, campaign).respond(204, '', {'Location': '/admin/gifting/vouchercampaigns/32'});

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.post(campaign).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).toHaveBeenCalled();
    expect(failSpy).not.toHaveBeenCalled();

    expect(successSpy.mostRecentCall.args[0]).toBe('/admin/gifting/vouchercampaigns/32');

  });

  it('should not return success promise if server fails the POST', function () {
    $httpBackend.expectPOST(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS).respond(500);
    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.post({}).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).not.toHaveBeenCalled();
    expect(failSpy).toHaveBeenCalled();
  });

  it('should do a PUT to update an existing campaign', function () {
    var campaign = {
      'name' : 'Sample Campaign',
      'description' : 'A very simple test campaign',
      'enabled' : true
    };

    var campaignId = 999;

    $httpBackend.expectPUT(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + campaignId, campaign).respond(204);

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.put(campaignId, campaign).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).toHaveBeenCalled();
    expect(failSpy).not.toHaveBeenCalled();
  });

  it('should not return success promise if server fails the PUT', function () {
    var campaign = {
      'name' : 'Sample Campaign',
      'description' : 'A very simple test campaign',
      'enabled' : true
    };

    var campaignId = 999;

    $httpBackend.expectPUT(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + campaignId, campaign).respond(500);

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.put(campaignId, campaign).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).not.toHaveBeenCalled();
    expect(failSpy).toHaveBeenCalled();

  });


  it('should allow enabling a campaign', function () {
    var campaignId = 999;
    var enabled = true;
    $httpBackend.expectPUT(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + campaignId, {enabled: enabled}).respond(204);

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.setEnabled(campaignId, enabled).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).toHaveBeenCalled();
    expect(failSpy).not.toHaveBeenCalled();
  });

  it('should not make a request if the setEnabled params are not defined', function () {
    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.setEnabled().then(successSpy, failSpy);
    Campaign.setEnabled(12).then(successSpy, failSpy);
    Campaign.setEnabled(undefined, 23).then(successSpy, failSpy);

    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();

    expect(failSpy).toHaveBeenCalled();
    expect(failSpy.calls.length).toBe(3);
  });

  it('should allow disabling a campaign', function () {
    var campaignId = 999;
    var enabled = false;
    $httpBackend.expectPUT(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + campaignId, {enabled: enabled}).respond(204);

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.setEnabled(campaignId, enabled).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).toHaveBeenCalled();
    expect(failSpy).not.toHaveBeenCalled();
  });

  it('should call error callback if enabling/disabling campaign fails', function () {
    var campaignId = 999;
    var enabled = false;
    $httpBackend.expectPUT(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + campaignId, {enabled: enabled}).respond(500);

    var successSpy = jasmine.createSpy('successSpy');
    var failSpy = jasmine.createSpy('failSpy');

    Campaign.setEnabled(campaignId, enabled).then(successSpy, failSpy);

    $httpBackend.flush();

    expect(successSpy).not.toHaveBeenCalled();
    expect(failSpy).toHaveBeenCalled();
  });

});
