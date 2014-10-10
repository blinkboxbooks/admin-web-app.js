'use strict';

describe('Controller: LoginCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
	});

	it('should reset User data', inject(function ($controller, $rootScope, User, AuthValid) {
		expect(User.get()).toBeNull();
		User.set(AuthValid.res);
		expect(User.get().username).toBe(AuthValid.res.user_username);
		var scope = $rootScope.$new();
		var LoginCtrl = $controller('LoginCtrl', {
			$scope: scope
		});
		expect(User.get()).toBeNull();
	}));

});
