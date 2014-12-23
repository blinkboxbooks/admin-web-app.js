'use strict';

describe('Service: Format', function () {
	var $httpBackend;

	// load module
	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
		inject(function(_$httpBackend_, _ROUTES_){
			$httpBackend = _$httpBackend_;
			ROUTES = _ROUTES_;
			$httpBackend.expectGET(_ROUTES_.USER).respond(200);
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

    $.each(PurchaseHistoryData.purchases, function (index, purchase) {
      var expectedPrice = 0;
      var expectedPayment = [];
      for(var i = 0; i < purchase.payments.length; i++){
        expectedPrice += +purchase.payments[i].money.amount;

        var methodText = '';
        if(purchase.payments[i].name === 'credit_balance'){
          methodText = ' account credit';
        } else {
          methodText = ' card (<code><a target="_blank" href="https://www.braintreegateway.com/merchants/xvcjgt5hdpv4863s/transactions/' + purchase.payments[i].receipt + '">' +  purchase.payments[i].receipt + '</a></code>)';
        }
        expectedPayment.push('£' + (+purchase.payments[i].money.amount) + methodText);
      }
      expectedPrice = '£' + expectedPrice;
      expectedPayment = expectedPayment.join(' + ');

      expect(Format.purchase(purchase, BookData.single.items[index])).toEqual({
        date: (new Date(purchase.date)).toString(),
        isbn: purchase.isbn,
        title: BookData.single.items[index].title,
        price: expectedPrice,
        payment: expectedPayment
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
				date: (new Date(email.user_username_changed_at)).toString(),
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

    var credit = {};
    expect(Format.credit(credit)).toEqual('£0');

    credit = null;
    expect(Format.credit(credit)).toEqual('£0');


	});
});
