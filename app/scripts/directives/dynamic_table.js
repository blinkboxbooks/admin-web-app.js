'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function($timeout) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			replace: true,
			controller: function($scope){
				$scope.users = [];
				$scope.search = {
					value: ''
				}
			},
			link: function(scope, element){
				var table = element.find('table');
				// Enable the datatable plugin on your directive.
				table.dataTable({
					// number of rows to display per page
					'iDisplayLength': 15,
					// controlling the generated table html
					'sDom': '<\'row-fluid pagination\'<\'span6\'lp>\r>t<\'row-fluid pagination\'<\'span6\'i>>',
					'fnDrawCallback': function(){
						// add paged class to table wrapper if we have more than one page
						table.parent().toggleClass('paged', this.fnPagingInfo().iTotalPages > 1);
					}
				});

				// sync table with scope collection
				scope.$watchCollection('users', function(old, value){
					table.fnClearTable();

					var users = [];
					for(var i = 0, l = value.length; i < l; i++){
						var user = value[i];
						users.push([user.first_name, user.last_name, user.username]);
					}

					table.fnAddData(users);
				});

			}
		};
	});
