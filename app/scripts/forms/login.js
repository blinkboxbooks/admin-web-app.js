'use strict';

angular.module('adminPanelApp')
	.directive('loginForm', function() {
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
			},
			link: function($scope){
				$scope.handlers = {
					submit: function(){
						$scope.loginForm.submitted = true;
						if ($scope.loginForm.$valid) {
							console.log('SUBMIT:', $scope.login);
						} else {
							console.log('FORM INVALID');
						}
					}
				};
			}
		};
	});
