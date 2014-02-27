'use strict';

describe('Controller: UserCtrl', function () {

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_, _AdminUsers_, _PurchaseHistoryData_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			AdminUsers = _AdminUsers_;
			PurchaseHistoryData = _PurchaseHistoryData_;
			$httpBackend.expectGET(ROUTES.USER).respond(401);
		});
	});

	var $httpBackend, ROUTES, UserCtrl, scope, userID = 1, AdminUsers, PurchaseHistoryData;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		UserCtrl = $controller('UserCtrl', {
			$scope: scope,
			$routeParams: {
				id: userID
			}
		});
	}));

	it('should save user information', function(){
		var response = AdminUsers.items[0];

		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID).respond(200, response);
		$httpBackend.expectGET(ROUTES.ADMIN_USERS + '/' + userID + ROUTES.PURCHASE_HISTORY).respond(200, PurchaseHistoryData);

		expect(scope.user.id).toBe(-1);

		$httpBackend.flush();

		expect(scope.user.id).not.toBe(-1);
		expect(scope.user.username).toBe(response.user_username);

		expect(scope.config.transactions.data.length).toBe(PurchaseHistoryData.purchases.length);
		$.each(scope.config.transactions.data, function(index, purchase){
			expect(purchase).toEqual({
				date: PurchaseHistoryData.purchases[index].date,
				isbn: PurchaseHistoryData.purchases[index].isbn,
				title: '[Book title]',
				price: PurchaseHistoryData.purchases[index].payments.map(function(payment){
					return '£' + payment.money.amount;
				}).join(', ')
			});
		});
	});

});
