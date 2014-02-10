'use strict';

angular.module('adminPanelApp')
	.directive('loginForm', function($rootScope, Authentication) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/login_form.html',
			scope: {},
			replace: true,
			controller: function($scope){
				$scope.login = {
					email: '',
					password: '',
					remember: false
				};

				$scope.alert = {
					type: '',
					text: ''
				};
			},
			link: function($scope){
				$scope.handlers = {
					submit: function(){
						$scope.loginForm.submitted = true;
						$scope.alert.text = '';

						if ($scope.loginForm.$valid) {
							Authentication.login({
								'grant_type': 'password',
								'username': $scope.login.email,
								'password': $scope.login.password,
								'remember_me': $scope.login.remember
							}).then($scope.handlers.success, $scope.handlers.error);
						}
					},
					error: function(response){
						$scope.loginForm.submitted = false;
						$scope.alert.type = 'danger';
						$scope.alert.text = response.data.error_description || 'Unknown error.';
					},
					success: function(){
						$scope.loginForm.submitted = false;
						$scope.alert.type = 'success';
						$scope.alert.text = 'Login successful';
					}
				};
			}
		};
	});
