'use strict';

describe('Service: Authentication', function () {
	// load module
	beforeEach(module('adminPanelApp'));
	beforeEach(module('templates'));
	beforeEach(inject(function(_$httpBackend_){
		_$httpBackend_.expectGET('/api/auth/users').respond(200);
	}));
});
