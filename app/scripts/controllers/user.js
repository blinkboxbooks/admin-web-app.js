'use strict';

/**
 * The User controller retrieves and displays the user information.
 * It requires an ID parameter.
 * */
angular.module('adminPanelApp')
	.controller('UserCtrl', function ($routeParams, $scope, Admin) {

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
				data: [ // todo remove static data
					{
						date: '2014',
						isbn: '123456789',
						title: 'The Book Thief',
						price: '£4.00'
					}
				],
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
		}

		// Get the user
		Admin.get($routeParams.id).then(function(response){
			var id = response.data.user_id.split(':');
			$scope.user.first_name = response.data.user_first_name;
			$scope.user.id = id[id.length - 1];
			$scope.user.last_name = response.data.user_last_name;
			$scope.user.username = response.data.user_username;
		});
	});
