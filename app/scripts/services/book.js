'use strict';

angular.module('adminPanelApp')
	.factory('Book', function($http, $q, ROUTES) {

		return {
			get: function(isbn) {
				var defer = $q.defer();
				if(!!isbn){
					$http({
						method: 'GET',
						url: ROUTES.BOOK,
						params: {
							id: isbn
						},
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
							if(response.data.numberOfResults > 0){
								defer.resolve(response.data.items);
							} else {
								defer.resolve([]);
							}
						}, defer.reject);
				} else {
					defer.reject('Books service requires an isbn.');
				}
				return defer.promise;
			}
		};

	}
);