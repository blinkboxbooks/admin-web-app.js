'use strict';

describe('Form: Login', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			// Save a reference to $httpBackend
			$httpBackend = _$httpBackend_;

			// user is not initially logged in
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
			_$httpBackend_.whenGET(_ROUTES_.SESSION).respond(200);
			_$httpBackend_.flush();
		});
	});

	var element, scope, $httpBackend, ROUTES,
		LoginData, AuthInvalid, AuthValid, SessionMock;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _ROUTES_, _LoginData_, _AuthInvalid_, _AuthValid_, _SessionMock_){
		// Save a references
		ROUTES = _ROUTES_;
		LoginData = _LoginData_;
		AuthInvalid = _AuthInvalid_;
		AuthValid = _AuthValid_;
		SessionMock = _SessionMock_;

		// Compile a piece of HTML containing the directive
		element = $compile('<login-form></login-form>')($rootScope);

		// Compile
		$rootScope.$apply();

		// Save element scope
		scope = element.isolateScope();
	}));

	it('Replaces the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element.find('[type="email"]').length).toBe(1); // 1 email input
		expect(element.find('[type="password"]').length).toBe(1); // 1 password input
		expect(element.find('[type="checkbox"]').length).toBe(1); // 1 checkbox
		expect(element.find('[type="submit"]').length).toBe(1); // 1 submit button
	});

	it('Updating scope will update the form inputs.', function() {
		// LoginData data is cloned to avoid its pollution
		scope.login = $.extend({}, LoginData);
		scope.$apply();

		expect(element.find('[type="email"]').val()).toBe(scope.login.email);
		expect(element.find('[type="password"]').val()).toBe(scope.login.password);
		expect(element.find('[type="checkbox"]').prop('checked')).toBe(scope.login.remember);
	});

	it('Form is validated.', function() {
		// LoginData data is cloned to avoid its pollution
		scope.login = $.extend({}, LoginData);
		scope.$apply();
		expect(scope.loginForm.$valid).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-valid');
		expect(element.find('[type="password"]')).toHaveClass('ng-valid');

		// Missing email field
		scope.login.email = '';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.email.$error.required).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-invalid');

		// Invalid email field
		scope.login.email = 'not_an_email';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.email.$error.email).toBeTruthy();
		expect(element.find('[type="email"]')).toHaveClass('ng-invalid');

		// Missing password field
		scope.login.email = LoginData.email;
		scope.login.password = '';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.password.$error.required).toBeTruthy();
		expect(element.find('[type="password"]')).toHaveClass('ng-invalid');

	});


	it('Form valid and invalid submit works as expected', function(){
		// set up form with valid credentials
		scope.login = LoginData;
		scope.$apply();

		// prepare invalid response
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param({
			'grant_type': 'password',
			'username': scope.login.email,
			'password': scope.login.password,
			'remember_me': scope.login.remember
		})).respond(400, AuthInvalid.res);

		// mock submit form
		scope.handlers.submit();
		$httpBackend.flush();

		// expect error message
		expect(scope.alert.text).toBe(AuthInvalid.res.error_description);
		expect(scope.alert.type).toBe('danger');

		// prepare valid response
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param({
			'grant_type': 'password',
			'username': scope.login.email,
			'password': scope.login.password,
			'remember_me': scope.login.remember
		})).respond(200, AuthValid.res);
		$httpBackend.expectGET(ROUTES.SESSION).respond(200, SessionMock.valid);

		// mock submit form
		scope.handlers.submit();
		$httpBackend.flush();

		// expect success message
		expect(scope.alert.text).not.toBeUndefined();
		expect(scope.alert.type).toBe('success');

	});

});
