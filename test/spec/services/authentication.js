'use strict';

describe('Service: Authentication', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp');
		module('templates');
		inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;

			$httpBackend.expectGET('/api/auth/users').respond(401);
			$httpBackend.flush();
		});
	});

	var Authentication, User, $httpBackend, ROUTES,
		valid = {
			req: {
				username: 'aaa@bbb.com',
				password: 123123,
				remember_me: false,
				grant_type: 'password'
			},
			res: {
				access_token: 'aaa.bbb-aaa-bbb-ccc',
				expires_in: 1800,
				refresh_token: 'abcabc',
				token_type: 'bearer',
				user_first_name: 'FN',
				user_id: 'urn:blinkbox:zuul:user:xxx',
				user_last_name: 'LN',
				user_uri: 'https://auth.blinkboxbooks.com.internal:8080/users/xxx',
				user_username: 'aaa@bbb.com'
			}
		},
		invalid = {
			req: {
				username: 'invalid@aaa.com',
				password: 123123,
				remember_me: false,
				grant_type: 'password'
			},
			res: null
		};

	// Load the service to test
	beforeEach(inject(function(_Authentication_, _User_, _ROUTES_){
		Authentication = _Authentication_;
		ROUTES  = _ROUTES_;
		User = _User_;
	}));

	it('Authentication should be injected.', function () {
		expect(Authentication).not.toBeUndefined();
	});

	it('User attempts login with valid credentials.', function () {
		// prepare http response for login attempt.
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param(valid.req)).respond(200, valid.res);

		// perform login
		Authentication.login(valid.req);
		expect(User.get()).toBeNull();

		// respond to login
		$httpBackend.flush();

		// we should have user data
		var user = User.get();
		expect(user).not.toBeNull();
		expect(user.first_name).toEqual(valid.res.user_first_name);
		expect(user.last_name).toEqual(valid.res.user_last_name);
		expect(user.id).toEqual(valid.res.user_id);
		expect(user.username).toEqual(valid.res.user_username);
		expect(user.first_name).toEqual(valid.res.user_first_name);
	});

	it('User attempts login with invalid credentials.', function () {
		// prepare http response for login attempt.
		$httpBackend.expectPOST(ROUTES.AUTHENTICATION, $.param(invalid.req)).respond(400);

		// perform login
		Authentication.login(invalid.req);
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
		User.set(valid.res);
		expect(User.get()).not.toBeNull();

		// perform signout request
		Authentication.logout();
		$httpBackend.flush();

		// expected signout to be successful
		expect(User.get()).toBeNull();
	});

});