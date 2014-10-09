'use strict';

angular.module('adminPanelApp')
	.factory('Campaign', function($http, $q, ROUTES) {
		return {
			get: function(id) {
				var defer = $q.defer();
				$http({
					method: 'GET',
					url: ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + (id ? '/' + id : ''),
					headers: {
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
					defer.resolve(response.data);
				}, defer.reject);
				return defer.promise;
			}
		};
	}
);
