'use strict';

/**
 * The User controller retrieves and displays the user information.
 * It requires an ID parameter.
 * */
angular.module('adminPanelApp')
	.controller('UserCtrl', function ($routeParams, $scope, Admin, Purchase) {

		// View model for the current user
		$scope.user = {
			id: -1,
			first_name: '',
			last_name: '',
			username: ''
		};

		// Configuration of the dynamic table
		$scope.config = {
			transactions: {
				data: [],
				structure: [
					{
						'field': 'date',
						'label': 'Date'
					},
					{
						'field': 'isbn',
						'label': 'ISBN'
					},
					{
						'field': 'title',
						'label': 'Book Title'
					},
					{
						'field': 'price',
						'label': 'Price'
					}
				]
			},
			email: {
				data: [ // todo remove static data
					{
						date: '2014',
						original_email: 'bbb@ccc.com',
						new_email: 'aaa@bbb.com'
					}
				],
				structure: [
					{
						'field': 'date',
						'label': 'Date'
					},
					{
						'field': 'original_email',
						'label': 'Original Email'
					},
					{
						'field': 'new_email',
						'label': 'New Email'
					}
				]
			}
		};

		// Get the user's personal details
		Admin.get($routeParams.id).then(function(response){
			var id = response.data.user_id.split(':');
			$scope.user.first_name = response.data.user_first_name;
			$scope.user.id = id[id.length - 1];
			$scope.user.last_name = response.data.user_last_name;
			$scope.user.username = response.data.user_username;
		});

		// takes an array of payments and returns a formated string
		var _formatPrice = function(payments){
			return payments.map(function(payment){
				return '£' + payment.money.amount;
			}).join(', ');
		};

		// Get the users purchase history
		Purchase.get($routeParams.id).then(function(response){
			// format data to be used in the table
			$scope.config.transactions.data = [];
			for(var i = 0, l = response.data.count; i < l; i++){
				var purchase = response.data.purchases[i];
				$scope.config.transactions.data.push({
					date: purchase.date,
					isbn: purchase.isbn,
					title: '[Book title]',
					price: _formatPrice(purchase.payments)
				});
			}
		});

	});
