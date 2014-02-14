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

				$timeout(function(){
					for(var i=0; i< 100; i++){
						$scope.users.push({
							'first_name': 'AAA',
							'last_name': 'BBB',
							'username': 'username'
						});
					}
				}, 7000);
			},
			link: function(scope, element){
				// Enable the datatable plugin on your directive.
				element.dataTable({
					// number of rows to display per page
					'iDisplayLength': 15,
					// controlling the generated table html
					'sDom': '<\'row-fluid pagination\'<\'span6\'lp>\r>t<\'row-fluid pagination\'<\'span6\'i>>',
					'fnDrawCallback': function(){
						// add paged class to table wrapper if we have more than one page
						element.parent().toggleClass('paged', this.fnPagingInfo().iTotalPages > 1);
					}
				});

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
