'use strict';

describe('Service: User', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp');
		module('templates');
		inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;

			$httpBackend.expectGET('/api/auth/users').respond(200, mockUser);
		});
	});

	var User, mockUser = {
		user_allow_marketing_communications: true,
		user_first_name: "FN",
		user_id: "urn:blinkbox:zuul:user:xxx",
		user_last_name: "LN",
		user_uri: "https://auth.blinkboxbooks.com.internal:8080/users/xxx",
		user_username: "xxx@xxx.com"
	};

	// Load the service to test
	beforeEach(inject(function(_User_){
		User = _User_;
	}));

	it('Service should be injected.', function () {
		expect(User).not.toBeUndefined();
	});

	it('Get user', function(){
		expect(User.get()).toBeNull();

		// allow the user service to return user data
		$httpBackend.flush();

		var user = User.get();
		expect(user).not.toBeNull();
		expect(user.first_name).toEqual(mockUser.user_first_name);
		expect(user.last_name).toEqual(mockUser.user_last_name);
		expect(user.id).toEqual(mockUser.user_id);
		expect(user.username).toEqual(mockUser.user_username);
		expect(user.first_name).toEqual(mockUser.user_first_name);
	});

	it('Set user', function(){
		expect(User.get()).toBeNull();

		// set method to mock object
		User.set(mockUser);
		var user = User.get();
		expect(user).not.toBeNull();
		expect(user.first_name).toEqual(mockUser.user_first_name);
		expect(user.last_name).toEqual(mockUser.user_last_name);
		expect(user.id).toEqual(mockUser.user_id);
		expect(user.username).toEqual(mockUser.user_username);
		expect(user.first_name).toEqual(mockUser.user_first_name);

		// set to null
		User.set();
		expect(User.get()).toBeNull();
	});
});
