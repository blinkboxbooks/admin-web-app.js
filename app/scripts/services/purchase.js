'use strict';

angular.module('adminPanelApp')
	.factory('Purchase', function($http, ROUTES) {

		return {
			get: function(id) {
				return !!id ? $http({
					method: 'GET',
					url: ROUTES.ADMIN_USERS + '/' + id + ROUTES.PURCHASE_HISTORY,
					headers: {
						'X-Requested-With': 'XMLHttpRequest'
					}
				}) : null;
			}
		};

	}
);