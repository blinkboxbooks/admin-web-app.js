'use strict';

describe('Service: User', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _UserData_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200, _UserData_);
      $httpBackend.whenGET(_ROUTES_.SESSION).respond(200);
    });
	});

	var User, UserData, Format;

	// Load the service to test
	beforeEach(inject(function(_User_, _UserData_, _Format_){
		User = _User_;
		UserData = _UserData_;
		Format = _Format_;
	}));

	it('Service should be injected.', function () {
		expect(User).not.toBeUndefined();
	});

	it('Get user', function(){
		expect(User.get()).toBeNull();

		// allow the user service to return user data
		$httpBackend.flush();

		var user = User.get();
		expect(user).toBeDefined();
		expect(user).toEqual(Format.user(UserData));
	});

	it('Set user', function(){
		expect(User.get()).toBeNull();

		// set method to mock object
		User.set(UserData);
		var user = User.get();
		expect(user).toBeDefined();
		expect(user).toEqual(Format.user(UserData));

		// set to null
		User.set();
		expect(User.get()).toBeNull();
	});
});
