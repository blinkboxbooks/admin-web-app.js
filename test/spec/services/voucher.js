'use strict';

describe('Service: Voucher', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
      $httpBackend.whenGET(_ROUTES_.SESSION).respond(200);
    });
	});

	var $rootScope, Voucher, VouchersData, EmptyVouchersData, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _Voucher_, _VouchersData_, _EmptyVouchersData_){
		$rootScope = _$rootScope_;
		Voucher = _Voucher_;
		VouchersData = $.extend({}, _VouchersData_);
		EmptyVouchersData = _EmptyVouchersData_;
	}));

	it('Should return user vouchers history', function(){
		var code = '1111222233334444', voucher, error;

		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + code).respond(200, VouchersData.items[0]);

		Voucher.get(code).then(function(data){
			voucher = data;
		});

		expect(voucher).toBeUndefined();

		$httpBackend.flush();

		expect(voucher).toEqual(VouchersData.items[0]);

		// Handling invalid voucher code
		voucher = undefined;
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + 123).respond(404);

		Voucher.get(123).then(function(data){
			voucher = data;
		}, function () {
			error = true;
		});

		expect(voucher).toBeUndefined();
		$httpBackend.flush();
		expect(voucher).toBeUndefined();
		expect(error).toBeTruthy();
	});

	it('Should handle errors', function(){
		var err;
		Voucher.get().then(null, function(data){
			err = data;
		});
		$rootScope.$apply();
		expect(err).toBeTruthy();
	});

});
