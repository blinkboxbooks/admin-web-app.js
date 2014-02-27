'use strict';

angular.module('adminPanelApp')
	.factory('Admin', function($http, ROUTES) {
		return {
			search: function(data) {
				return $http({
					method: 'GET',
					url: ROUTES.ADMIN_USERS,
					params: data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					}
				});
			},
			get: function(id){
				return !!id ? $http({
					method: 'GET',
					url: ROUTES.ADMIN_USERS + '/' + id,
					headers: {
						'X-Requested-With': 'XMLHttpRequest'
					}
				}) : null;
			}
		};
	}
);