'use strict';

describe('Service: Admin', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200, _UserData_);
		});
	});

	var Admin, AdminUsers, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_Admin_, _AdminUsers_){
		Admin = _Admin_;
		AdminUsers = _AdminUsers_;
	}));

	rit('Service should be injected.', function () {
		expect(Admin).not.toBeUndefined();
	});

	it('Get users by email', function(){
		var mockUsername = 'username';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mockUsername).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			username: mockUsername
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

	it('Get users by first name', function(){
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mockUsername).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			first_name: 'first_name'
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

	it('Get users by last name', function(){
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mockUsername).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			last_name: 'last_name'
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

});
