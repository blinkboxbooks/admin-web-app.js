'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function(Admin) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			replace: true,
			controller: function($scope){
				var emailRegEx = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/,
					nameRegEx = /\w\s+\w/,
					idRegEx = /\d+/;

				$scope.users = [];
				$scope.search = {
					value: '',
					types: {
						Email: 'email',
						Name: 'name',
						ID: 'id'
					},
					type: function(){
						if($scope.search.value.match(emailRegEx)){
							return $scope.search.types.Email;
						} else if($scope.search.value.match(nameRegEx)){
							return $scope.search.types.Name;
						} else if($scope.search.value.match(idRegEx)){
							return $scope.search.types.ID;
						}
						return null;
					}
				};
				$scope.alert = {
					type: '',
					message: ''
				};
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
						users.push([user.id, user.first_name, user.last_name, user.username]);
					}

					table.fnAddData(users);
				});

				// perform search for users on submit
				scope.submit = function(){
					// reset alert message
					scope.alert.type = '';
					scope.alert.text = '';

					// perform search
					if(scope.search.value){

						// prepare parameters for API
						var param = {};
						switch(scope.search.type()){
							case scope.search.types.ID:
								param.user_id = scope.search.value;
								break;
							case scope.search.types.Name:
								var names = scope.search.value.split(/\s+/, 2);
								if(names.length === 2){
									param.first_name = names[0];
									param.last_name = names[1];
								} else {
									scope.alert.type = 'danger';
									scope.alert.text = 'You must search for the first name and the last name of the user (both are required and must be separated by a space)';
									return;
								}
								break;
							default:
								param.username = scope.search.value;
						}

						// perform call
						Admin.search(param).then(function(response){
							if(response.data.items){
								scope.alert.type = 'success';

								// populate table with results
								scope.users = [];
								for(var i = 0, l = response.data.items.length; i < l; i++){
									var item = response.data.items[i],
										id = item.user_id.split(':');

									scope.users.push({
										id: id[id.length - 1],
										first_name: item.user_first_name,
										last_name: item.user_last_name,
										username: item.user_username
									});
								}

								if(!response.data.items.length){
									scope.alert.type = 'info';
									scope.alert.text = 'No users found for: ' + scope.search.value;
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
				};
			}
		};
	});
