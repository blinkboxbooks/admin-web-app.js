'use strict';

angular.module('adminPanelApp')
	.factory('Authentication', function($http, $q, $location, User, PATHS, ROUTES) {
		return {
			login: function(data) {
				var defer = $q.defer();
				$http({
					method: 'POST',
					url: ROUTES.AUTHENTICATION,
					data: $.param(data),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(function(response){
					$http({
						method: 'GET',
						url: ROUTES.SESSION,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'X-Requested-With': 'XMLHttpRequest'
						}
					}).then(function(session){
						if(session.data && angular.isArray(session.data.user_roles)){
							var valid = false;
							for(var i= 0, l = session.data.user_roles.length; i< l; i++){
								var role = session.data.user_roles[i];
								if(role === 'csr' || role === 'csm'){
									valid = true;
									break;
								}
							}
							if(valid){
								// On successful authentication, set the user data and go to the location specified by the redirectTo param (defaults to the home page).
								User.set(response.data);
								// redirect the user back to where he came from
								var param = $location.search();
								$location.url(param.redirectTo || PATHS.HOME);
								defer.resolve();
							} else {
								$http({
									method: 'GET',
									url: ROUTES.SIGNOUT
								});
								defer.reject({
									data: {
										error_description: 'You must have CSM/CSR account in order to access the admin panel.'
									}
								});
							}
						} else {
							$http({
								method: 'GET',
								url: ROUTES.SIGNOUT
							});
							defer.reject({
								data: {
									error_description: 'You must have CSM/CSR account in order to access the admin panel.'
								}
							});
						}
					}, function(err){
						// Log out user to delete the cookie
						$http({
							method: 'GET',
							url: ROUTES.SIGNOUT
						});
						defer.reject(err);
					});
				}, function(err){
					defer.reject(err);
				});
				return defer.promise;
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