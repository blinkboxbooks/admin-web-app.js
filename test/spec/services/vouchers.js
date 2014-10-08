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

	var $rootScope, Vouchers, VouchersData, EmptyVouchersData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _Vouchers_, _VouchersData_, _EmptyVouchersData_){
		$rootScope = _$rootScope_;
		Vouchers = _Vouchers_;
		VouchersData = $.extend({}, _VouchersData_);
		EmptyVouchersData = _EmptyVouchersData_;
	}));

	it('Should return vouchers history', function(){
		var userID = 1, vouchers;

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '?user=' + userID).respond(200, VouchersData);

		Vouchers.get(userID).then(function(data){
			vouchers = data;
		});

		expect(vouchers).toBeUndefined();

		$httpBackend.flush();

		expect(vouchers.items).toBeArray();
		$.each(vouchers.items, function(index, voucher){
			expect(voucher).toEqual(VouchersData.items[index]);
		});

		// Handling empty history
		vouchers = undefined;
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '?user=' + userID).respond(200, EmptyVouchersData);

		Vouchers.get(userID).then(function(data){
			vouchers = data;
		});

		expect(vouchers).toBeUndefined();

		$httpBackend.flush();

		expect(vouchers.items).toBeArray();
		expect(vouchers.items.length).toBe(0);
	});

	it('Should handle errors', function(){
		var err;
		Vouchers.get().then(null, function(data){
			err = data;
		});
		$rootScope.$apply();
		expect(err).toBeTruthy();
	});

});
