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
				data: [],
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
		Admin.get($routeParams.id).then(function(user){
			$scope.user = user;
			$scope.config.email.data = user.previous_emails;
		});

		// Get the users purchase history
		Purchase.get($routeParams.id).then(function(purchases){
			// format data to be used in the table
			$scope.config.transactions.data = purchases;
		});

	});
