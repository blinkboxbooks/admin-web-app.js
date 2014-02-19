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
					// On successful authentication, set the user data and go to the location specified by the redirectTo param (defaults to the home page).
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
					// Set user to undefined, erasing all data. Then go to the login page.
					User.set();

					$location.url(PATHS.LOGIN);
				});
			}
		};
	}
);