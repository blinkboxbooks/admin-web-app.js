'use strict';

describe('Directive: Add credit', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var element, scope, Format, $httpBackend, CreditData, ROUTES, SETTINGS;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _CreditData_, _Format_, _SETTINGS_){
		CreditData = $.extend({}, _CreditData_);
		Format = _Format_;
		SETTINGS = _SETTINGS_;

		var outerScope = $rootScope.$new();
		outerScope.user = {
			id: 1,
			credit: 2
		};

		// Compile a piece of HTML containing the directive
		element = $compile('<add-credit-form user="user"></add-credit-form>')(outerScope);

		// Compile
		$rootScope.$apply();

		// Save a reference to scope
		scope = element.isolateScope();
	}));

	it('Should replace the element with the appropriate content', function() {
		var reasons = [
			SETTINGS.CREDIT_REASONS.VIP,
			SETTINGS.CREDIT_REASONS.EMPLOYEE,
			SETTINGS.CREDIT_REASONS.CUSTOMER
		];

		// Check that the compiled element contains the templated content
		expect(element).toMatch('form[name="addCreditForm"]');
		expect(element.find('[name="amount"]')).toMatch('input[type="number"]');
		expect(element.find('[name="reason"]')).toMatch('input[type="radio"]');
		expect(element.find('[name="reason"]').length).toBe(reasons.length);

		// Check scope binding
		expect(scope.credit).toEqual({
			amount: '',
			reason: '',
			reasons: reasons
		});
		expect(scope.addCredit).toBeFunction();
		expect(scope.user).toBeDefined();
	});

	it('Should validate input', function() {
		// add invalid amount (NaN), should not validate
		scope.credit.amount = 'a';
		scope.$apply();
		expect(scope.addCreditForm.$valid).toBe(false);

		// no reason specified, should not validate
		scope.credit.amount = 23;
		scope.$apply();
		expect(scope.addCreditForm.$valid).toBe(false);

		// no reason specified, should not validate
		scope.credit.amount = 23;
		scope.credit.reason = SETTINGS.CREDIT_REASONS.VIP;
		scope.$apply();
		expect(scope.addCreditForm.$valid).toBe(true);
	});

	it('Should add credit and update credit amount.', function(){

		$httpBackend.expectPOST(ROUTES.ADMIN_USERS + '/' + scope.user.id + ROUTES.CREDIT, $.param({
			'currency': 'GBP',
			'amount': '1',
			'reason': 'vip'
		})).respond(200, CreditData);

		// add credit
		scope.credit.amount = 1;
		scope.credit.reason = 'vip';
		scope.$apply();
		scope.addCredit();

		$httpBackend.flush();

		expect(scope.user.credit).toBe(Format.credit(CreditData));

	});

	it('Should handle errors.', function(){

		$httpBackend.expectPOST(ROUTES.ADMIN_USERS + '/' + scope.user.id + ROUTES.CREDIT, $.param({
			'currency': 'GBP',
			'amount': '1',
			'reason': 'vip'
		})).respond(500);

		// add credit
		scope.credit.amount = 1;
		scope.credit.reason = 'vip';
		scope.$apply();
		scope.addCredit();

		$httpBackend.flush();

		expect(scope.alert.type).toBe('danger');
		expect(scope.alert.text).toBeTruthy();
	});
});
