'use strict';

describe('Service: Purchase', function () {
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

	var Purchase, PurchaseHistoryData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_Purchase_, _PurchaseHistoryData_){
		Purchase = _Purchase_;
		PurchaseHistoryData = $.extend({}, _PurchaseHistoryData_);
	}));

	it('Service should be injected.', function () {
		expect(Purchase).not.toBeUndefined();
	});

	it('Should return purchase history', function(){
		var userID = 1, history;

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID + ROUTES.PURCHASE_HISTORY).respond(200, PurchaseHistoryData);

		Purchase.get(userID).then(function(response){
			history = response.data;
		});

		expect(history).toBeUndefined();

		$httpBackend.flush();

		expect(history).toBeDefined();
		expect(history).toEqual(PurchaseHistoryData);
	});

});
