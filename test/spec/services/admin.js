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

	var Admin, $rootScope, AdminUsers, CreditData, Format, ROUTES;

	// Load the service to test
	beforeEach(inject(function(_$rootScope_, _Admin_, _AdminUsers_, _Format_, _CreditData_){
		Admin = _Admin_;
		CreditData = _CreditData_;
		AdminUsers = _AdminUsers_;
		Format = _Format_;
		$rootScope = _$rootScope_;
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
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers.items.map(function(d){ return Format.user(d);}));
	});

	it('Get users by first name', function(){
		var mockFirstName = 'first_name';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?first_name=' + mockFirstName).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			first_name: mockFirstName
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers.items.map(function(d){ return Format.user(d);}));
	});

	it('Get users by last name', function(){
		var mockLastName = 'last_name';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?last_name=' + mockLastName).respond(200, AdminUsers);

		var users = null;

		Admin.search({
			last_name: mockLastName
		}).then(function(data){
				users = data;
			});

		expect(users).toBeNull();

		$httpBackend.flush();

		expect(users).toEqual(AdminUsers.items.map(function(d){ return Format.user(d);}));
	});

	it('Should get user information', function(){
		var userID = 1,
			response = AdminUsers.items[0];

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID).respond(200, response);
		$httpBackend.expectGET(ROUTES.ADMIN_SERVICES + '/' + userID + ROUTES.CREDIT).respond(200, CreditData);

		var user;

		Admin.get(userID).then(function(data){
			user = data;
		});

		expect(user).toBeUndefined();

		$httpBackend.flush();

		expect(user).toBeDefined();
		expect(user).toEqual(Format.user(response, CreditData));

	});

	it('Should get basic user information only', function(){
		var userID = 1,
			response = AdminUsers.items[0];

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID).respond(200, response);

		var user;

		Admin.get(userID, true).then(function(data){
			user = data;
		});

		expect(user).toBeUndefined();

		$httpBackend.flush();

		expect(user).toBeDefined();
		expect(user).toEqual(Format.user(response));
	});

	it('Should handle errors', function(){

		// Attempt to search with undefined id
		var err;
		expect(err).toBeUndefined();
		Admin.get().then(null, function(data){
			err = data;
		});
		$rootScope.$apply();
		expect(err).toEqual({
			data: {
				error_description: 'The admin service requires an id of the user to retrieve'
			}
		});

		// Back end return malformed result
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=test').respond(200, {});
		Admin.search({
			username: 'test'
		}).then(null, function(data){
			err = data;
		});
		$httpBackend.flush();
		expect(err).toEqual({
			data: {
				error_description: 'Unknown error occurred.'
			}
		});

	});

});
