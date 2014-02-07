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
				$scope.handlers = {
					submit: function(){
						console.log('SUBMIT:', $scope.login);
					}
				};
			},
			link: function(){}
		};
	});
