'use strict';

describe('Service: Campaign', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
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

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS).respond(200, CampaignsData);

		Campaign.get().then(function(data){
			campaigns = data;
		});

		expect(campaigns).toBeUndefined();

		$httpBackend.flush();

		expect(campaigns).toEqual(CampaignsData);
	});

});
