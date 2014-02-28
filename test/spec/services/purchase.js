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

	var Purchase, PurchaseHistoryData, BookData, Format, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_Purchase_, _PurchaseHistoryData_, _BookData_, _Format_){
		Purchase = _Purchase_;
		Format = _Format_;
		BookData = $.extend({}, _BookData_);
		PurchaseHistoryData = $.extend({}, _PurchaseHistoryData_);
	}));

	it('Service should be injected.', function () {
		expect(Purchase).not.toBeUndefined();
	});

	it('Should return purchase history', function(){
		var userID = 1, history;

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID + ROUTES.PURCHASE_HISTORY).respond(200, PurchaseHistoryData);
		$httpBackend.expectGET(ROUTES.BOOK + '?id=' + PurchaseHistoryData.purchases.map(function(d){return d.isbn;}).join('&id=')).respond(200, BookData.single);

		Purchase.get(userID).then(function(data){
			history = data;
		});

		expect(history).toBeUndefined();

		$httpBackend.flush();

		expect(history).toBeArray();
		$.each(history, function(index, purchase){
			expect(purchase).toEqual(Format.purchase(PurchaseHistoryData.purchases[index], BookData.single.items[index]));
		});
	});

});
