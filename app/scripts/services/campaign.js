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
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: ROUTES.GIFTING_SERVICES + ROUTES.CAMPAIGNS,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'x-content-type': 'application/vnd.blinkbox.books.v2+json'
          },
          data: campaign
        }).then(function(response){
          deferred.resolve(response.headers().location);
        }, function(error){
          deferred.reject(error);
        });

        return deferred.promise;
      }
		};
	}
);
