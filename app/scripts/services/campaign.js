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
			},
      post: function(campaign){
        return $http({
          method: 'POST',
          url: ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'x-content-type': 'application/vnd.blinkbox.books.v2+json'
          },
          data: campaign
        }).then(function(response){
          return response.headers().location;
        });
      },
      put: function(id, campaign){
        return $http({
          method: 'PUT',
          url: ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS + '/' + id,
          headers: {
            'x-content-type': 'application/vnd.blinkbox.books.v2+json'
          },
          data: campaign
        });
      }
		};
	}
);
