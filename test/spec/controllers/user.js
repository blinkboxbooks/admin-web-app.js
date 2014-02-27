'use strict';

describe('Controller: UserCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		module();
		inject(function(_$httpBackend_, _ROUTES_, _AdminUsers_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			AdminUsers = _AdminUsers_;
			$httpBackend.expectGET(ROUTES.USER).respond(401);
		});
	});

	var $httpBackend, ROUTES, UserCtrl, scope, userID = 1, AdminUsers;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		UserCtrl = $controller('UserCtrl', {
			$scope: scope,
			$routeParams: {
				id: userID
			}
		});
	}));

	it('should save user information', function(){
		var response = AdminUsers.items[0];

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID).respond(200, response);

		expect(scope.user.id).toBe(-1);

		$httpBackend.flush();

		expect(scope.user.id).not.toBe(-1);
		expect(scope.user.username).toBe(response.user_username);

	});

});
