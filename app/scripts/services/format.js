'use strict';

angular.module('adminPanelApp')
	.factory('Format', function() {

		return {
			purchase: function(purchase, book) {
				return {
					date: (new Date(purchase.date)).toDateString(),
					isbn: purchase.isbn,
					title: book.title,
					price: '<ul>' + purchase.payments.map(function(payment){
						return '<li>£' + payment.money.amount + ' - ' + (payment.name === 'braintree' ? 'card' : 'credit') + '</li>';
					}).join(', ') + '</ul>'
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
				return data ? '£' + data.amount : null;
			}
		};

	}
);