'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			replace: true,
			controller: function($scope){
				$scope.labels = ['First Name', 'Last Name', 'Email'];
				$scope.users = [{
					'first_name': 'first_name',
					'last_name': 'last_name',
					'username': 'username'
				}]
			},
			link: function(){}
		};
	});
