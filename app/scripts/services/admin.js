'use strict';

angular.module('adminPanelApp')
	.factory('Admin', function($http, $q, Credit, Format, ROUTES) {
		return {
			search: function(data) {
				var defer = $q.defer();
				$http({
					method: 'GET',
					url: ROUTES.ADMIN_USERS,
					params: data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
					if($.isArray(response.data.items)){
						defer.resolve(response.data.items.map(function(item){
							return Format.user(item);
						}));
					} else {
						defer.reject({
							data: {
								error_description: 'Unknown error occurred.'
							}
						});
					}
				}, defer.reject);
				return defer.promise;
			},
			get: function(id, basicDataOnly){
				var defer = $q.defer();
				if(!!id){
					$http({
						method: 'GET',
						url: ROUTES.ADMIN_USERS + '/' + id,
						headers: {
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(response){
							var user = Format.user(response.data);
							if (basicDataOnly) {
								defer.resolve(user);
							} else {
								Credit.get(id).then(function(credit){
									if(!!credit){
										user.credit = credit;
									}
									defer.resolve(user);
								}, defer.reject);
							}
						}, defer.reject);
				} else {
					defer.reject({
						data: {
							error_description: 'The admin service requires an id of the user to retrieve'
						}
					});
				}
				return defer.promise;
			}
		};
	}
);