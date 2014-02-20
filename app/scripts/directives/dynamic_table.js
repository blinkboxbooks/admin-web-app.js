'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function(Admin) {
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
				$scope.alert = {
					type: '',
					message: ''
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

				// perform search for users on submit
				scope.submit = function(){
					if(scope.search.value){
						Admin.search({
							username: scope.search.value
						}).then(function(response){
								console.log(response);
							if(response.data.items){
								scope.alert.type = 'success';

								scope.users = [];
								for(var i = 0, l = response.data.items.length; i < l; i++){
									var item = response.data.items[i];
									scope.users.push({
										first_name: item.user_first_name,
										last_name: item.user_last_name,
										username: item.user_username
									});
								}

								if(response.data.items.length){
									scope.alert.text = 'Found ' + response.data.items.length + 'user' + (response.data.items.length > 1 ? 's' : '');
								} else {
									scope.alert.type = 'info';
									scope.alert.text = 'No users found with the username: ' + scope.search.value;
								}
							} else {
								scope.alert.type = 'danger';
								scope.alert.text = 'Unknown error occurred. Please try again';
							}
						}, function(response){
							scope.alert.type = 'danger';
							scope.alert.text = response.data.error_description || 'Unknown error.';
						});
					}
				}
			}
		};
	});
