'use strict';

describe('Directive: Dynamic Table', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var element, scope;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _DataTableConfig_){
		// set up directive config
		$rootScope.config = $.extend({}, _DataTableConfig_);

		// Compile a piece of HTML containing the directive
		element = $compile('<dynamic-table config="config"></dynamic-table>')($rootScope);

		// Compile
		$rootScope.$apply();

		// Save a reference to scope
		scope = element.isolateScope();
	}));

	it('should replace the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element).toMatch('table');
		expect(element.find('thead')).toMatch('thead');
		expect(element.find('tbody')).toMatch('tbody');
		expect(element.find('tfoot')).toMatch('tfoot');

		// Check scope binding
		expect(scope.config).toBeDefined();
	});

	it('should create labels', function() {
		// Check that the compiled element contains the templated content
		var thead = element.find('thead tr');

		expect(thead.length).toBe(1);

		thead = thead.find('th');

		// The number of columns should match the number of elements specified in structure
		expect(thead.length).toBe(scope.config.structure.length);

		// The labels should represent the structure
		thead.each(function(index, th){
			expect(th.innerHTML).toBe(scope.config.structure[index].label);
		});
	});

	/* todo move this to main controller test
	it('Should inject users into the dynamic table.', function(){

		scope.users = DataTableUsers.group;
		scope.$apply();

		expect(element.find('tbody tr').length).toBe(scope.users.length);
		element.find('tbody tr').each(function(index, tr){
			var td = $(tr).find('td');

			expect(td[0].innerHTML).toBe(scope.users[index].id);
			expect(td[1].innerHTML).toBe(scope.users[index].first_name);
			expect(td[2].innerHTML).toBe(scope.users[index].last_name);
			expect(td[3].innerHTML).toBe(scope.users[index].username);

		});

		scope.users.push(DataTableUsers.single);
		scope.$apply();

		expect(element.find('tbody tr').length).toBe(scope.users.length);

		// Expect new user to be in the table
		var td = element.find('tbody tr').last().find('td');
		expect(td[0].innerHTML).toBe(DataTableUsers.single.id);
		expect(td[1].innerHTML).toBe(DataTableUsers.single.first_name);
		expect(td[2].innerHTML).toBe(DataTableUsers.single.last_name);
		expect(td[3].innerHTML).toBe(DataTableUsers.single.username);

	});

	it('should update search input based on scope value', function(){
		expect(scope.search).toBeDefined();

		expect(scope.search.value).toBeFalsy();

		var mockSearchValue = 'search';
		scope.search.value = mockSearchValue;
		scope.$apply();

		expect(element.find('form input').val()).toBe(mockSearchValue);
	});
	*/
});
