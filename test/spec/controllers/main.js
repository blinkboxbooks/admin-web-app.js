'use strict';

describe('Controller: MainCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp');
		module('templates');
		inject(function(_$httpBackend_, _ROUTES_){
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
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

	it('should contain data to be displayed', function(){
		expect(scope.config).toBeDefined();
		expect(scope.config.data).toBeDefined();
		expect(scope.config.structure).toBeDefined();
	});

});
