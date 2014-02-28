'use strict';

describe('Service: Format', function () {
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

	var Format, BookData, PurchaseHistoryData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_Format_, _PurchaseHistoryData_, _BookData_){
		Format = _Format_;
		BookData = $.extend({}, _BookData_);
		PurchaseHistoryData = $.extend({}, _PurchaseHistoryData_);
	}));

	it('Service should be injected.', function () {
		expect(Format).toBeDefined();
	});

	it('Should format purchase history data', function(){

		$.each(PurchaseHistoryData.purchases, function(index, purchase){
			expect(Format.purchase(purchase, BookData.single.items[index])).toEqual({
				date: (new Date(purchase.date)).toDateString(),
				isbn: purchase.isbn,
				title: BookData.single.items[index].title,
				price: '<ul>' + purchase.payments.map(function(payment){
					return '<li>£' + payment.money.amount + ' - ' + (payment.name === 'braintree' ? 'card' : 'credit') + '</li>';
				}).join(', ') + '</ul>'
			});
		});
	});

});
