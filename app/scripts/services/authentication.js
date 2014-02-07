'use strict';

angular.module('adminPanelApp')
	.factory('Authentication', function($http, $location, User, PATHS, ROUTES) {
		return {
			login: function(data) {
				return $http({
					method: 'POST',
					url: ROUTES.AUTHENTICATION,
					data: $.param(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
					User.set(response.data);

					var param = $location.search();
					$location.url(param.redirectTo || PATHS.HOME);
				});
			},
			logout: function() {
				return $http({
					method: 'GET',
					url: ROUTES.SIGNOUT
				}).then(function(){
					// set user to undefined
					User.set();

					// go back to login page
					$location.url(PATHS.LOGIN);
				});
			}
		};
	}
);