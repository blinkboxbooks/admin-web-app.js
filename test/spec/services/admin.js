'use strict';

describe('Service: Admin', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_, _UserData_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200, _UserData_);
		});
	});

	var Admin, AdminUsers, CreditData, Format, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_Admin_, _AdminUsers_, _Format_, _CreditData_){
		Admin = _Admin_;
		CreditData = _CreditData_;
		AdminUsers = _AdminUsers_;
		Format = _Format_;
	}));

	it('Service should be injected.', function () {
		expect(Admin).not.toBeUndefined();
	});

	it('Get users by email', function(){
		var mockUsername = 'username';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mockUsername).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			username: mockUsername
		}).then(function(response){
				users = response.data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

	it('Get users by first name', function(){
		var mockFirstName = 'first_name';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?first_name=' + mockFirstName).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			first_name: mockFirstName
		}).then(function(response){
				users = response.data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

	it('Get users by last name', function(){
		var mockLastName = 'last_name';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?last_name=' + mockLastName).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			last_name: mockLastName
		}).then(function(response){
				users = response.data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers);
	});

	it('Should get user information', function(){
		var userID = 1,
			response = AdminUsers.items[0];

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID).respond(200, response);
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID + ROUTES.CREDIT).respond(200, CreditData);

		var user;

		Admin.get(userID).then(function(data){
			user = data;
		});

		expect(user).toBeUndefined();

		$httpBackend.flush();

		expect(user).toBeDefined();
		expect(user).toEqual(Format.user(response, CreditData));

	});

});
