'use strict';

describe('Service: Book', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200);
			$httpBackend.whenGET(_ROUTES_.SESSION).respond(200);
		});
	});

	var Book, ROUTES, BookData;

	// Load the service to test
	beforeEach(inject(function(_Book_, _BookData_){
		Book = _Book_;
		BookData = _BookData_;
	}));

	it('Service should be injected.', function () {
		expect(Book).toBeDefined();
	});

	it('should handle errors', function(){
		var err;

		Book.get().then(null, function(data){
			err = data;
		});

		expect(err).toBeUndefined();

		$httpBackend.flush();

		expect(err).toBe('Books service requires an isbn.');
	});

	it('should return an empty array', function(){
		var book, isbn = 123456789;

		$httpBackend.expectGET(ROUTES.BOOK + '?id=' + isbn).respond(200, BookData.empty);

		Book.get(isbn).then(function(data){
			book = data;
		});

		expect(book).toBeUndefined();

		$httpBackend.flush();

		expect(book).toBeArray();
		expect(book.length).toBe(0);
	});

	it('should return a single book\'s details', function(){
		var book, isbn = 123456789;

		$httpBackend.expectGET(ROUTES.BOOK + '?id=' + isbn).respond(200, BookData.single);

		Book.get(isbn).then(function(data){
			book = data;
		});

		expect(book).toBeUndefined();

		$httpBackend.flush();

		expect(book).toBeArray();
		expect(book.length).toBe(1);

		$.each(book, function(i, b){
			expect(b).toEqual(BookData.single.items[i]);
		});
	});

	it('should return an array of books', function(){
		var books, isbn = [123456789, 123456789];

		$httpBackend.expectGET(ROUTES.BOOK + '?id=' + isbn.join('&id=')).respond(200, BookData.group);
		Book.get(isbn).then(function(data){
			books = data;
		});

		expect(books).toBeUndefined();

		$httpBackend.flush();

		expect(books).toBeArray();
		expect(books.length).toBe(isbn.length);

		$.each(books, function(i, b){
			expect(b).toEqual(BookData.group.items[i]);
		});

	});
});
