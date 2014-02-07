'use strict';

angular.module('adminPanelApp')
	.factory('Authentication', function($http, ROUTES) {
		return {
			login: function(data) {
				return $http({
					method: 'POST',
					url: ROUTES.AUTHENTICATION,
					data: $.param(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					}
				});
			}
		};
	}
);