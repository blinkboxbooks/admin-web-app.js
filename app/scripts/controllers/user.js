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
		Admin.get($routeParams.id).then(function(response){
			var id = response.data.user_id.split(':');
			$scope.user.first_name = response.data.user_first_name;
			$scope.user.id = id[id.length - 1];
			$scope.user.last_name = response.data.user_last_name;
			$scope.user.username = response.data.user_username;

			// sort previous emails from most recent to oldest
			var emails = response.data.user_previous_usernames.sort(function(a, b){
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
			$scope.config.email.data = [];
			for(var i = 0, l = emails.length; i < l; i++){
				var email = emails[i];
				$scope.config.email.data.push({
					date: (new Date(email.user_username_changed_at)).toDateString(),
					original_email: email.user_username,
					new_email: i > 0 ? emails[i - 1].user_username : $scope.user.username
				});
			}
		});

		// Get the users purchase history
		Purchase.get($routeParams.id).then(function(purchases){
			// format data to be used in the table
			$scope.config.transactions.data = purchases;
		});

	});
