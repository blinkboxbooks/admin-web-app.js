'use strict';

describe('Directive: Search', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
			$httpBackend.whenGET(_ROUTES_.SESSION).respond(200);
		});
	});

	var element, scope, outerScope, AdminUsers, Format, $httpBackend, ROUTES;

	// Store references to the element and it's scope
	// so they are available to all tests in this describe block
	beforeEach(inject(function($compile, $rootScope, _DataTableUsers_, _Format_, _AdminUsers_){
		AdminUsers = $.extend({}, _AdminUsers_);
		Format = _Format_;

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

	it('Should handle errors', function(){
		// No users found
		scope.search.value = 'test';
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + scope.search.value).respond(200, {items:[]});
		scope.submit();
		$httpBackend.flush();
		expect(scope.data.length).toBe(0);
		expect(scope.alert.type).toBe('info');
		expect(scope.alert.text).toBeTruthy();

		// Invalid response format
		scope.search.value = 'test';
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + scope.search.value).respond(500);
		scope.submit();
		$httpBackend.flush();
		expect(scope.data.length).toBe(0);
		expect(scope.alert.type).toBe('danger');
		expect(scope.alert.text).toBeTruthy();
	});

	it('Should perform search.', function(){

		var mock = {
			username: 'username',
			ID: 234,
			first_name: 'fn',
			last_name: 'fn'
		};

		var _validate_results = function(){
			$httpBackend.flush();

			expect(scope.data.length).toEqual(AdminUsers.items.length);

			$.each(scope.data, function(i, e){
				expect(e).toEqual(Format.user(AdminUsers.items[i]));
			});
		};

		// Checking search with email
		scope.search.value = mock.username;
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?username=' + mock.username).respond(200, AdminUsers);
		scope.submit();
		_validate_results();

		// Checking search with name
		scope.search.value = mock.first_name + ' ' + mock.last_name;
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?first_name=' + mock.first_name + '&last_name=' + mock.last_name).respond(200, AdminUsers);
		scope.submit();
		_validate_results();

		// Checking search with email
		scope.search.value = mock.ID + '';
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '?user_id=' + mock.ID).respond(200, AdminUsers);
		scope.submit();
		_validate_results();

	});
});
