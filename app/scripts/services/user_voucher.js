'use strict';

angular.module('adminPanelApp')
	.factory('UserVoucher', function($http, $q, ROUTES) {

		return {
			get: function(id) {
				var defer = $q.defer();
				if (!!id) {
					$http({
						method: 'GET',
						url: ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS,
						params: {
							userId: id
						},
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
						defer.resolve(response.data);
					}, defer.reject);
				} else {
					defer.reject('The UserVoucher service requires the user id as an argument.');
				}
				return defer.promise;
			}
		};

	}
);
