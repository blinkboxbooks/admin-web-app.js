'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function($timeout) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			replace: true,
			controller: function($scope){
				$scope.users = [{
					'first_name': 'AAA',
					'last_name': 'BBB',
					'username': 'username'
				}];
				$scope.settings = {
					'iDisplayLength': 15 // number of rows to display per page
				};
			},
			link: function(scope, element){
				// Enable the datatable plugin on your directive.
				element.DataTable(scope.settings);

				// sync table with scope collection
				scope.$watchCollection('users', function(old, value){
					element.fnClearTable();

					var users = [];
					for(var i = 0, l = value.length; i < l; i++){
						var user = value[i];
						users.push([user.first_name, user.last_name, user.username]);
					}

					element.fnAddData(users);
				});

			}
		};
	});
