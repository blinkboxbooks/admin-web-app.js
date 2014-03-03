'use strict';

angular.module('adminPanelApp')
	.directive('search', function(Admin) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/search.html',
			scope: {
				data: '='
			},
			replace: true,
			controller: function($scope){

				var emailRegEx = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/,
					nameRegEx = /\w\s+\w/,
					idRegEx = /\d+/;


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

				$scope.submit = function(){
					// reset alert message
					$scope.alert.type = '';
					$scope.alert.text = '';

					// perform search
					if($scope.search.value){

						// prepare parameters for API
						var param = {};
						switch($scope.search.type()){
							case $scope.search.types.ID:
								param.user_id = $scope.search.value;
								break;
							case $scope.search.types.Name:
								var names = $scope.search.value.split(/\s+/, 2);
								param.first_name = names[0];
								param.last_name = names[1];
								break;
							default:
								param.username = $scope.search.value;
						}

						// perform call
						Admin.search(param).then(function(items){
							$scope.alert.type = 'success';

							// populate results
							$scope.data = items;

							if(!items.length){
								$scope.alert.type = 'info';
								$scope.alert.text = 'No users found for: ' + $scope.search.value;
							}
						}, function(response){
							$scope.alert.type = 'danger';
							$scope.alert.text = response.data && response.data.error_description ? response.data.error_description : 'Unknown error.';
						});
					}
				};
			}
		};
	});
