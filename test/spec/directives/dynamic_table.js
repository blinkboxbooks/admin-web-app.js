'use strict';

describe('Directive: Dynamic Table', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates');
		inject(function(_$httpBackend_, _ROUTES_){
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var element, scope;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope){
		// Compile a piece of HTML containing the directive
		element = $compile('<dynamic-table></dynamic-table>')($rootScope);

		// Compile
		$rootScope.$apply();

		// Save a reference to scope
		scope = element.isolateScope();
	}));

	it('Replaces the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element.find('thead').length).toBe(1);
		expect(element.find('tbody').length).toBe(1);
		expect(element.find('tfoot').length).toBe(1);
	});

	it('Binds data to view', function(){
		scope.labels = ['Milk', 'Eggs', 'Frosted Flakes', 'Salami', 'Juice'];
		scope.$apply();

		expect(element.find('thead th').length).toBe(scope.labels.length);
		expect(element.find('tfoot th').length).toBe(scope.labels.length);

		scope.users = [{}, {}, {}];
		scope.$apply();

		expect(element.find('tbody tr').length).toBe(scope.users.length);
	});
});
