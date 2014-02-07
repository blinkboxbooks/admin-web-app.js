'use strict';

describe('Controller: MainCtrl', function () {

	// load module
	beforeEach(module('adminPanelApp'));
	beforeEach(module('templates'));
	beforeEach(inject(function(_$httpBackend_){
		_$httpBackend_.expectGET('/api/auth/users').respond(200);
	}));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

});
