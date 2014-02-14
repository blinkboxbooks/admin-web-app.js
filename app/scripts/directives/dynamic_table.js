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
					// number of rows to display per page
					'iDisplayLength': 15,
					// controlling the generated table html
					'sDom': '<\'row-fluid1\'<\'span6\'lp>\r>t<\'row-fluid\'<\'span6\'i>>'
				};
			},
			link: function(scope, element){
				// Enable the datatable plugin on your directive.
				element.dataTable(scope.settings);

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
