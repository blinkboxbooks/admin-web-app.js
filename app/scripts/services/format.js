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
			user: function(data){
				if(!!data){
					var id = data.user_id.split(':');
					return {
						first_name: data.user_first_name,
						id: id[id.length - 1],
						last_name: data.user_last_name,
						username: data.user_username
					};
				}
				return null;
			}
		};

	}
);