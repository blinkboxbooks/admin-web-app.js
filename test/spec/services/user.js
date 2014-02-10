'use strict';

describe('Service: User', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _UserData_, _ROUTES_){
			$httpBackend = _$httpBackend_;

			$httpBackend.expectGET(_ROUTES_.USER).respond(200, _UserData_);
		});
	});

	var User, UserData;

	// Load the service to test
	beforeEach(inject(function(_User_, _UserData_){
		User = _User_;
		UserData = _UserData_;
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
		expect(user.first_name).toEqual(UserData.user_first_name);
		expect(user.last_name).toEqual(UserData.user_last_name);
		expect(user.id).toEqual(UserData.user_id);
		expect(user.username).toEqual(UserData.user_username);
		expect(user.first_name).toEqual(UserData.user_first_name);
	});

	it('Set user', function(){
		expect(User.get()).toBeNull();

		// set method to mock object
		User.set(UserData);
		var user = User.get();
		expect(user).not.toBeNull();
		expect(user.first_name).toEqual(UserData.user_first_name);
		expect(user.last_name).toEqual(UserData.user_last_name);
		expect(user.id).toEqual(UserData.user_id);
		expect(user.username).toEqual(UserData.user_username);
		expect(user.first_name).toEqual(UserData.user_first_name);

		// set to null
		User.set();
		expect(User.get()).toBeNull();
	});
});
