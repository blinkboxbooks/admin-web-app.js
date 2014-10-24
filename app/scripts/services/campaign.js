'use strict';

angular.module('adminPanelApp')
	.factory('Campaign', function($http, $q, ROUTES) {
		return {
			get: function(id) {
				var hasId = typeof id === 'number';
				return $http({
					method: 'GET',
					url: ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + (hasId ? '/' + id : ''),
					params: !hasId && {
						count: 999
					},
					headers: {
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
					return response.data;
				});
			}
		};
	}
);
