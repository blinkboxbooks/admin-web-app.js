'use strict';

angular.module('adminPanelApp')
	.factory('Voucher', function($http, $q, ROUTES) {

		return {
			get: function(code) {
				if (!!code) {
					return $http({
						method: 'GET',
						url: ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS + '/' + code,
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
						return response.data;
					});
				} else {
					return $q.reject('The voucher service requires the voucher code as an argument.');
				}
			}
		};

	}
);
