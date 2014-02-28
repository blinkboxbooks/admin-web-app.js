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
			}
		};

	}
);