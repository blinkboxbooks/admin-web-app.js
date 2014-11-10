'use strict';

angular.module('adminPanelApp')
	.factory('UserVoucher', function($http, $q, ROUTES) {

		return {
			get: function(id) {
				if (!!id) {
					return $http({
						method: 'GET',
						url: ROUTES.GIFTING_SERVICES + ROUTES.VOUCHERS,
						params: {
							userId: id,
							count: 999
						},
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
						return response.data;
					});
				} else {
					return $q.reject('The UserVoucher service requires the user id as an argument.');
				}
			}
		};

	}
);
