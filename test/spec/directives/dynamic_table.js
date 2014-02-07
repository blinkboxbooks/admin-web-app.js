'use strict';

describe('Directive: Dynamic Table', function () {

	// load module
	beforeEach(module('adminPanelApp'));
	beforeEach(module('templates'));
	beforeEach(inject(function(_$httpBackend_){
		_$httpBackend_.expectGET('/api/auth/users').respond(200);
	}));

	var element, scope;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope){
		// create a mock scope for the element
		scope = $rootScope.$new();

		// Compile a piece of HTML containing the directive
		element = $compile('<dynamic-table></dynamic-table>')(scope);

		// Compile
		scope.$apply();
	}));

	it('Replaces the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element.find('thead').length).toBe(1);
		expect(element.find('tbody').length).toBe(1);
		expect(element.find('tfoot').length).toBe(1);
	});
});
