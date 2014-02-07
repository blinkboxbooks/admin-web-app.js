'use strict';

angular.module('adminPanelApp')
	.factory('User', function($http, ROUTES) {
		var User = {
			get: function() {
				return $http({
					method: 'GET',
					url: ROUTES.USER,
					headers: {
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma': 'no-cache',
						'Expires': 0,
						'X-Requested-With': 'XMLHttpRequest'
					}
				});
			}
		};

		return User;
	}
);