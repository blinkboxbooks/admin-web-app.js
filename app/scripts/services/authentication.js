'use strict';

angular.module('adminPanelApp')
	.factory('Authentication', function($http) {
		return {
			login: function(data) {
				return $http({
					method: 'POST',
					url: '/api/auth/oauth2/token',
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