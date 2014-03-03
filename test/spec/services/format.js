'use strict';

describe('Service: Format', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(401);
		});
	});

	var Format, BookData, PurchaseHistoryData, UserData, CreditData, ROUTES, AdminUsers;

	// Load the service to test
	beforeEach(inject(function(_Format_, _PurchaseHistoryData_, _BookData_, _CreditData_, _UserData_, _AdminUsers_){
		Format = _Format_;
		BookData = $.extend({}, _BookData_);
		PurchaseHistoryData = $.extend({}, _PurchaseHistoryData_);
		CreditData = _CreditData_;
		UserData = _UserData_;
		AdminUsers = _AdminUsers_;
	}));

	it('Service should be injected.', function () {
		expect(Format).toBeDefined();
	});

	it('Should format purchase history data', function(){

		$.each(PurchaseHistoryData.purchases, function(index, purchase){
			expect(Format.purchase(purchase, BookData.single.items[index])).toEqual({
				date: (new Date(purchase.date)).toDateString(),
				isbn: purchase.isbn,
				title: BookData.single.items[index].title,
				price: '<ul>' + purchase.payments.map(function(payment){
					return '<li>£' + payment.money.amount + ' - ' + (payment.name === 'braintree' ? 'card' : 'credit') + '</li>';
				}).join(', ') + '</ul>'
			});
		});
	});

	it('Should format user data', function(){

		var user = AdminUsers.items[0], id = user.user_id.split(':');

		// sort previous emails from most recent to oldest
		var emails = user.user_previous_usernames.sort(function(a, b){
			var diff = new Date(b.user_username_changed_at) - new Date(a.user_username_changed_at);
			if(diff > 0){
				return 1;
			}
			if(diff < 0){
				return -1;
			}
			return 0;
		});

		// format emails to be used in the table
		var temp = [];
		for(var i = 0, l = emails.length; i < l; i++){
			var email = emails[i];
			temp.push({
				date: (new Date(email.user_username_changed_at)).toDateString(),
				original_email: email.user_username,
				new_email: i > 0 ? emails[i - 1].user_username : user.user_username
			});
		}

		expect(Format.user(user)).toEqual({
			first_name: user.user_first_name,
			id: id[id.length - 1],
			last_name: user.user_last_name,
			username: user.user_username,
			previous_emails: temp
		});

		expect(Format.user(user, CreditData)).toEqual({
			first_name: user.user_first_name,
			id: id[id.length - 1],
			last_name: user.user_last_name,
			username: user.user_username,
			credit: Format.credit(CreditData),
			previous_emails: temp
		});

	});

	it('Should format credit data', function(){

		expect(Format.credit(CreditData)).toEqual('£4.56');

	});
});
