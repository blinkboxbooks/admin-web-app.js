'use strict';

describe('Form: Login', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp');
		module('templates');
		inject(function(_$httpBackend_){
			// Save a reference to $httpBackend
			$httpBackend = _$httpBackend_;

			// user is not initially logged in
			_$httpBackend_.expectGET('/api/auth/users').respond(401);
			_$httpBackend_.flush();
		});
	});

	var element, scope, $httpBackend, ROUTES,
		mockLogin = {
			email: 'test@test.com',
			password: '123123',
			remember: true
		}, mockInvalidResponse = {
			error: "invalid_grant",
			error_description: "The username and/or password is incorrect."
		}, mockValidResponse = {
				access_token: 'aaa.bbb-aaa-bbb-ccc',
				expires_in: 1800,
				refresh_token: 'abcabc',
				token_type: 'bearer',
				user_first_name: 'FN',
				user_id: 'urn:blinkbox:zuul:user:xxx',
				user_last_name: 'LN',
				user_uri: 'https://auth.blinkboxbooks.com.internal:8080/users/xxx',
				user_username: 'aaa@bbb.com'
		};

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _ROUTES_){
		// Save a reference to ROUTES
		ROUTES = _ROUTES_;
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
		// mockLogin data is cloned to avoid its pollution
		scope.login = $.extend({}, mockLogin);
		scope.$apply();

		expect(element.find('[type="email"]').val()).toBe(scope.login.email);
		expect(element.find('[type="password"]').val()).toBe(scope.login.password);
		expect(element.find('[type="checkbox"]').prop('checked')).toBe(scope.login.remember);
	});

	it('Form is validated.', function() {
		// mockLogin data is cloned to avoid its pollution
		scope.login = $.extend({}, mockLogin);
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
		scope.login.email = mockLogin.email;
		scope.login.password = '';
		scope.$apply();
		expect(scope.loginForm.$valid).toBeFalsy();
		expect(scope.loginForm.password.$error.required).toBeTruthy();
		expect(element.find('[type="password"]')).toHaveClass('ng-invalid');

	});


	it('Form valid and invalid submit works as expected', function(){
		// set up form with valid credentials
		scope.login = mockLogin;
		scope.$apply();

		// prepare invalid response
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param({
			'grant_type': 'password',
			'username': scope.login.email,
			'password': scope.login.password,
			'remember_me': scope.login.remember
		})).respond(400, mockInvalidResponse);

		// mock submit form
		scope.handlers.submit();
		$httpBackend.flush(1);

		// expect error message
		expect(scope.alert.text).toBe(mockInvalidResponse.error_description);
		expect(scope.alert.type).toBe('danger');

		// prepare valid response
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param({
			'grant_type': 'password',
			'username': scope.login.email,
			'password': scope.login.password,
			'remember_me': scope.login.remember
		})).respond(200, mockValidResponse);

		// mock submit form
		scope.handlers.submit();
		$httpBackend.flush(1);

		// expect success message
		expect(scope.alert.text).not.toBeUndefined();
		expect(scope.alert.type).toBe('success');

	});

});
