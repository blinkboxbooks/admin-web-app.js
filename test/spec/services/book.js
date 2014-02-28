'use strict';

describe('Service: Book', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;

			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var Book, BookData;

	// Load the service to test
	beforeEach(inject(function(_Book_, _BookData_){
		Book = _Book_;
		BookData = _BookData_;
	}));

	it('Service should be injected.', function () {
		expect(Book).toBeDefined();
	});

	it('should return a single book\'s details', function(){
		expect(Book.get()).toBeNull();

		var book;

		Book.get(123456789).then(function(response){
			book = response.data;
		});

		expect(book).toBeNull();

		$httpBackend.flush();

		expect(book).toBeDefined();

	});

	it('should return an array of books info', function(){
		var books;

		Book.get([123456789, 123456789]).then(function(response){
			books = response.data;
		});

		expect(books).toBeNull();

		$httpBackend.flush();

		expect(books).toBeArray();
	});
});
