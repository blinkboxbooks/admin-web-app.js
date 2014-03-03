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

		// expect field function to transform a user id into a link to the user page
		var structure = scope.config.structure[scope.config.structure.length - 1];
		expect(structure.field).toBeFunction();
		expect(structure.field({
			id: 1
		})).toEqual('<a href="'+scope.PATHS.USER+'/1">Edit</a>');

	});

});
