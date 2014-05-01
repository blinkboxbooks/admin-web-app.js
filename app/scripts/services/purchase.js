'use strict';

angular.module('adminPanelApp')
	.factory('Purchase', function($http, $q, Book, Format, ROUTES) {

		return {
			get: function(id) {
				var defer = $q.defer();
				if(!!id){
					$http({
						method: 'GET',
						url: ROUTES.ADMIN_SERVICES + '/' + id + ROUTES.PURCHASE_HISTORY + '?count=999',
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
							if(response.data.count > 0){
								Book.get(response.data.purchases.map(function(d){ return d.isbn; }), response.data.count).then(function(books){
									defer.resolve(response.data.purchases.map(function(d, i){
										return Format.purchase(d, books[i]);
									}));
								}, defer.reject);
							} else {
								// user didn't do any purchases
								defer.resolve([]);
							}
						}, defer.reject);
				} else {
					defer.reject('The purchase service requires the user id as an arg.');
				}
				return defer.promise;
			}
		};

	}
);