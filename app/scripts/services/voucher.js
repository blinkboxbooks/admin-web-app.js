'use strict';

angular.module('adminPanelApp')
	.factory('Voucher', function($http, $q, ROUTES) {

		return {
			get: function(code) {
				var defer = $q.defer();
				if (!!code) {
					$http({
						method: 'GET',
						url: ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + code,
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
						defer.resolve(response.data);
					}, defer.reject);
				} else {
					defer.reject('The voucher service requires the voucher code as an argument.');
				}
				return defer.promise;
			}
		};

	}
);
