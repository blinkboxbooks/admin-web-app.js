'use strict';

describe('Service: UserVoucher', function () {
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

	var $rootScope, UserVoucher, VouchersData, EmptyVouchersData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _UserVoucher_, _VouchersData_, _EmptyVouchersData_){
		$rootScope = _$rootScope_;
		UserVoucher = _UserVoucher_;
		VouchersData = $.extend({}, _VouchersData_);
		EmptyVouchersData = _EmptyVouchersData_;
	}));

	it('Should return user vouchers history', function(){
		var userID = 1, vouchers;

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '?userId=' + userID).respond(200, VouchersData);

		UserVoucher.get(userID).then(function(data){
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
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '?userId=' + userID).respond(200, EmptyVouchersData);

		UserVoucher.get(userID).then(function(data){
			vouchers = data;
		});

		expect(vouchers).toBeUndefined();

		$httpBackend.flush();

		expect(vouchers.items).toBeArray();
		expect(vouchers.items.length).toBe(0);
	});

	it('Should handle errors', function(){
		var err;
		UserVoucher.get().then(null, function(data){
			err = data;
		});
		$rootScope.$apply();
		expect(err).toBeTruthy();
	});

});
