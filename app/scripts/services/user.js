'use strict';

angular.module('adminPanelApp')
	.factory('User', function($rootScope, $http, ROUTES, EVENTS, Format) {

		var user = null;
    var userCache = null;

		var User = {
			get: function(){
				return user;
			},
      getCache: function(){
        return userCache;
      },
			set: function(data){
				user = Format.user(data);
        if(user){
          userCache = user;
        }
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
