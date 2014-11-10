'use strict';

describe('Directive: Dynamic Table', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			_$httpBackend_.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var element, scope, DataTableUsers;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, $timeout, _DataTableConfig_, _DataTableUsers_){
		DataTableUsers = $.extend({}, _DataTableUsers_);
		// set up directive config
		$rootScope.config = $.extend({}, _DataTableConfig_);

		// Compile a piece of HTML containing the directive
		element = $compile('<dynamic-table config="config"></dynamic-table>')($rootScope);

		// Compile
		$rootScope.$apply();
		$timeout.flush();

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

	it('Should inject users into the dynamic table.', function(){
		scope.config.data = DataTableUsers.group;
		scope.$apply();

		expect(element.find('tbody tr').length).toBe(scope.config.data.length);

		var i, l;
		element.find('tbody tr').each(function(index, tr){
			var td = $(tr).find('td'),
				row = scope.config.data[index];

			expect(td.length).toBe(scope.config.structure.length);
			for(i = 0, l = td.length; i < l; i++){
				expect(td[i].innerHTML).toBe(
					$.isFunction(scope.config.structure[i].field) ?
						scope.config.structure[i].field(row) :
						row[scope.config.structure[i].field]
				);
			}
		});

		scope.config.data.push(DataTableUsers.single);

    scope.$apply();

		expect(element.find('tbody tr').length).toBe(scope.config.data.length);
		// Expect new user to be in the table
		var td = element.find('tbody tr').last().find('td'), row, value;

		expect(td.length).toBe(scope.config.structure.length);
		for(i = 0, l = scope.config.structure.length; i < l; i++){
			row = scope.config.structure[i];
			value = $.isFunction(row.field) ?
				row.field(DataTableUsers.single) :
				DataTableUsers.single[row.field];
			expect(td[i].innerHTML).toBe(value);
		}
	});
});
