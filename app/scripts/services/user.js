'use strict';

angular.module('adminPanelApp')
	.factory('User', function($rootScope, $http, ROUTES, EVENTS) {

		var user = null;

		// Format the user data to be used within the app.
		var _format = function(data){
			return data ? {
				first_name: data.user_first_name,
				id: data.user_id,
				last_name: data.user_last_name,
				username: data.user_username
			} : null;
		};

		var User = {
			get: function(){
				return user;
			},
			set: function(data){
				user = _format(data);
				$rootScope.$broadcast(EVENTS.USER_UPDATED, user);
			},
			refresh: function() {
				// Performs a request to update the user details.
				return $http({
					method: 'GET',
					url: ROUTES.USER,
					headers: {
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma': 'no-cache',
						'Expires': 0,
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
						User.set(response.data);
					});
			}
		};

		return User;
	}
);