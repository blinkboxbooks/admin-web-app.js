'use strict';

describe('Directive: Search', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var element, scope, outerScope, AdminUsers, $httpBackend, ROUTES;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _DataTableUsers_, _AdminUsers_){
		AdminUsers = $.extend({}, _AdminUsers_);

		outerScope = $rootScope.$new();
		outerScope.data = [];

		// Compile a piece of HTML containing the directive
		element = $compile('<search data="data"></search>')(outerScope);

		// Compile
		$rootScope.$apply();

		// Save a reference to scope
		scope = element.isolateScope();
	}));

	it('should replace the element with the appropriate content', function() {
		// Check that the compiled element contains the templated content
		expect(element.find('form')).toMatch('form');
		expect(element.find('form input')).toMatch('input');
		expect(element.find('.alert')).toMatch('.alert');

		// Check scope bindings
		expect(scope.search).toBeDefined();
		expect(scope.data).toBe(outerScope.data);
	});

	it('should detect search input types', function() {
		scope.search.value = 'aaa@aaa.com';
		expect(scope.search.type()).toBe(scope.search.types.Email);

		scope.search.value = 's s';
		expect(scope.search.type()).toBe(scope.search.types.Name);

		scope.search.value = '1';
		expect(scope.search.type()).toBe(scope.search.types.ID);
	});

	it('Should save search results.', function(){

		var mockUsername = 'username';

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mockUsername).respond(200, AdminUsers);

		scope.search.value = mockUsername;
		scope.submit();

		expect(scope.data.length).toBe(0);

		$httpBackend.flush();

		expect(scope.data.length).toEqual(AdminUsers.items.length);
		expect(scope.data).toEqual(outerScope.data);

		$.each(scope.data, function(i, e){
			expect(AdminUsers.items[i].user_id).toContain(e.id);
			expect(AdminUsers.items[i].user_first_name).toContain(e.first_name);
			expect(AdminUsers.items[i].user_last_name).toContain(e.last_name);
			expect(AdminUsers.items[i].user_username).toContain(e.username);
		});
	});
});
