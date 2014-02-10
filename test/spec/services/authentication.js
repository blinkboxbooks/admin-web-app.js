'use strict';

describe('Service: Authentication', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;

			$httpBackend.expectGET('/api/auth/users').respond(401);
			$httpBackend.flush();
		});
	});

	var Authentication, User, $httpBackend, ROUTES,
		AuthValid, AuthInvalid;

	// Load the service to test
	beforeEach(inject(function(_Authentication_, _User_, _ROUTES_, _AuthValid_, _AuthInvalid_){
		Authentication = _Authentication_;
		ROUTES  = _ROUTES_;
		User = _User_;
		AuthValid = _AuthValid_;
		AuthInvalid = _AuthInvalid_;
	}));

	it('Authentication should be injected.', function () {
		expect(Authentication).not.toBeUndefined();
	});

	it('User attempts login with valid credentials.', function () {
		// prepare http response for login attempt.
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param(AuthValid.req)).respond(200, AuthValid.res);

		// perform login
		Authentication.login(AuthValid.req);
		expect(User.get()).toBeNull();

		// respond to login
		$httpBackend.flush();

		// we should have user data
		var user = User.get();
		expect(user).not.toBeNull();
		expect(user.first_name).toEqual(AuthValid.res.user_first_name);
		expect(user.last_name).toEqual(AuthValid.res.user_last_name);
		expect(user.id).toEqual(AuthValid.res.user_id);
		expect(user.username).toEqual(AuthValid.res.user_username);
		expect(user.first_name).toEqual(AuthValid.res.user_first_name);
	});

	it('User attempts login with invalid credentials.', function () {
		// prepare http response for login attempt.
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param(AuthInvalid.req)).respond(400, AuthInvalid.res);

		// perform login
		Authentication.login(AuthInvalid.req);
		expect(User.get()).toBeNull();

		// respond to login
		$httpBackend.flush();

		// since login failed, we should not have user data
		expect(User.get()).toBeNull();
	});

	it('User logs out.', function () {
		// prepare http response for login attempt.
		$httpBackend.expectGET(ROUTES.SIGNOUT).respond(200);

		// set user information to pretend someone is logged in
		User.set(AuthValid.res);
		expect(User.get()).not.toBeNull();

		// perform signout request
		Authentication.logout();
		$httpBackend.flush();

		// expected signout to be successful
		expect(User.get()).toBeNull();
	});

});