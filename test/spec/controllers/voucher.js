'use strict';

describe('Controller: VoucherCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
	});

  var scope;

  beforeEach(inject(function ($rootScope, $httpBackend, ROUTES) {
		scope = $rootScope.$new();
	  $httpBackend.expectGET(ROUTES.USER).respond(401);
  }));

	it('should provide a voucher code submit method', inject(function ($controller, $location, PATHS) {
		var code = 'testtesttesttest';
		$controller('VoucherCtrl', {
			$scope: scope,
			$routeParams: {}
		});
		expect(scope.submit).toBeFunction();
		scope.code = code;
		scope.submit();
		expect($location.path()).toBe(PATHS.VOUCHER + '/' + code);
	}));

	it('should retrieve voucher, user and campaign data', inject(function ($controller, $rootScope, $httpBackend, ROUTES, VouchersData, AdminUsers, CampaignsData, Format) {
		var code = 'testtesttesttest';
		var voucherResponse = $.extend({}, VouchersData.items[0]);
		var userResponse = $.extend({}, AdminUsers.items[0]);
		var campaignResponse = $.extend({}, CampaignsData.items[0]);
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + code).respond(200, voucherResponse);
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + voucherResponse.redeemedByUser).respond(200, userResponse);
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + voucherResponse.campaignId).respond(200, campaignResponse);
		$controller('VoucherCtrl', {
			$scope: scope,
			$routeParams: {
				code: code
			}
		});
		expect(scope.code).toBe(code);
		expect(scope.voucher).toBeUndefined();
		expect(scope.user).toBeUndefined();
		expect(scope.campaign).toBeUndefined();
		$httpBackend.flush();
		expect(scope.voucher).toEqual(voucherResponse);
		expect(scope.user).toEqual(Format.user(userResponse));
		expect(scope.campaign).toEqual(campaignResponse);
	}));

	it('should handle errors', inject(function ($controller, $rootScope, $httpBackend, ROUTES) {
		var code = 'invalid';
		$httpBackend.expectGET(ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + code).respond(404);
		$controller('VoucherCtrl', {
			$scope: scope,
			$routeParams: {
				code: code
			}
		});
		expect(scope.code).toBe(code);
		expect(scope.voucher).toBeUndefined();
		expect(scope.campaign).toBeUndefined();
		expect(scope.alert).toBeUndefined();
		$httpBackend.flush();
		expect(scope.voucher).toBeUndefined();
		expect(scope.campaign).toBeUndefined();
		expect(scope.alert).toBeDefined();
	}));

});
