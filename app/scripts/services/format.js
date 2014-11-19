'use strict';

angular.module('adminPanelApp')
	.factory('Format', function(SETTINGS, ROUTES) {

		return {
			purchase: function (purchase, book) {
        var date = (new Date(purchase.date)).toDateString();

        var formatPaymentType = function(payment){
          var name = payment.name;
          if(name === SETTINGS.PAYMENT_METHODS.CREDIT_BALANCE) {
            return 'account credit';
          } else if (name === SETTINGS.PAYMENT_METHODS.BRAINTREE){
            return 'card (<code> <a href="' + ROUTES.BRAINTREE_MERCHANT + '/transactions/' + payment.receipt + '">' +  payment.receipt + '</a></code>)';
          } else {
            return '';
          }
        };

        var total = 0;
        var paymentType = [];
        for(var i = 0; i < purchase.payments.length; i++){
          var amount = + purchase.payments[i].money.amount;
          total += amount;
          if(amount > 0){
            paymentType.push('£' + amount + ' ' + formatPaymentType(purchase.payments[i]));
          }
        }

        paymentType = paymentType.join(' + ');
        paymentType = paymentType || 'N/A';


        return {
          date: date,
          isbn: purchase.isbn,
          title: book.title,
          price: '£' + total,
          payment: paymentType
        };
      },
			user: function(data, credit){
				if(!!data){
					var id = data.user_id.split(':'),
						user = {
						first_name: data.user_first_name,
						id: id[id.length - 1],
						last_name: data.user_last_name,
						username: data.user_username
					};

					// attach previous emails if they exist
					if($.isArray(data.user_previous_usernames)){
						// sort previous emails from most recent to oldest
						var emails = data.user_previous_usernames.sort(function(a, b){
							var diff = new Date(b.user_username_changed_at) - new Date(a.user_username_changed_at);
							if(diff > 0){
								return 1;
							}
							if(diff < 0){
								return -1;
							}
							return 0;
						});

						var temp = [];
						for(var i = 0, l = emails.length; i < l; i++){
							var email = emails[i];
							temp.push({
								date: (new Date(email.user_username_changed_at)).toDateString(),
								original_email: email.user_username,
								new_email: i > 0 ? emails[i - 1].user_username : data.user_username
							});
						}

						user.previous_emails = temp;
					}

					// save the credit
					if(credit){
						user.credit = this.credit(credit);
					}
					return user;
				}
				return null;
			},
			credit: function(data){
				if(data){
					if(angular.isArray(data.items) && data.items.length){
						return '£' + data.items[0].amount;
					} else if(data.amount){
						return '£' + data.amount;
					}
					return '£0';
				}
				return '£0';
			}
		};

	}
);
