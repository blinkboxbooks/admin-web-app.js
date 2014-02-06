'use strict';

angular.module('adminPanelApp')
	.directive('loginForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/login_form.html',
			scope: {},
			replace: true,
			controller: function(){},
			link: function(){}
		};
	});
