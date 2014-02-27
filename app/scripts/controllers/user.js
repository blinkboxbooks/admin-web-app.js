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

		// Get the user
		Admin.get($routeParams.id).then(function(response){
			var id = response.data.user_id.split(':');
			$scope.user.first_name = response.data.user_first_name;
			$scope.user.id = id[id.length - 1];
			$scope.user.last_name = response.data.user_last_name;
			$scope.user.username = response.data.user_username;
		});
	});
