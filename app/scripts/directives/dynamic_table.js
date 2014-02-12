'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function($timeout) {
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
				}];
				$timeout(function(){},2000);
			},
			link: function(scope, element){
				// Enable the datatable plugin on your directive.
				element.DataTable();
				scope.$watchCollection('users', function(){
					element.fnClearTable();
					element.fnAddData([]);
				});

			}
		};
	});
