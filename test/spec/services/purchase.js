'use strict';

describe('Service: Purchase', function () {
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

	var Purchase, $rootScope, EmptyPurchaseHistoryData, PurchaseHistoryData, BookData, Format, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _Purchase_, _PurchaseHistoryData_, _EmptyPurchaseHistoryData_, _BookData_, _Format_){
		Purchase = _Purchase_;
		Format = _Format_;
		EmptyPurchaseHistoryData = _EmptyPurchaseHistoryData_;
		$rootScope = _$rootScope_;
		BookData = $.extend({}, _BookData_);
		PurchaseHistoryData = $.extend({}, _PurchaseHistoryData_);
	}));

	it('Service should be injected.', function () {
		expect(Purchase).not.toBeUndefined();
	});

	it('Should return purchase history', function(){
		var userID = 1, history;

		$httpBackend.expectGET(ROUTES.ADMIN_SERVICES + '/' + userID + ROUTES.PURCHASE_HISTORY + '?count=999').respond(200, PurchaseHistoryData);
		$httpBackend.expectGET(ROUTES.BOOK + '?count=' + PurchaseHistoryData.count + '&id=' + PurchaseHistoryData.purchases.map(function(d){return d.isbn;}).join('&id=')).respond(200, BookData.single);

		Purchase.get(userID).then(function(data){
			history = data;
		});

		expect(history).toBeUndefined();

		$httpBackend.flush();

		expect(history).toBeArray();
		$.each(history, function(index, purchase){
			expect(purchase).toEqual(Format.purchase(PurchaseHistoryData.purchases[index], BookData.single.items[index]));
		});

		// Handling empty history
		history = undefined;
		$httpBackend.expectGET(ROUTES.ADMIN_SERVICES + '/' + userID + ROUTES.PURCHASE_HISTORY + '?count=999').respond(200, EmptyPurchaseHistoryData);

		Purchase.get(userID).then(function(data){
			history = data;
		});

		expect(history).toBeUndefined();

		$httpBackend.flush();

		expect(history).toBeArray();
		expect(history.length).toBe(0);
	});

	it('Should handle errors', function(){
		var err;
		Purchase.get().then(null, function(data){
			err = data;
		});
		$rootScope.$apply();
		expect(err).toBeTruthy();
	});

});
