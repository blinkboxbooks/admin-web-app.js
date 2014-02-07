'use strict';

describe('Controller: MainCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp');
		module('templates');
		inject(function(_$httpBackend_){
			_$httpBackend_.expectGET('/api/auth/users').respond(401);
		});
	});

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
