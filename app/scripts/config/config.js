'use strict';

angular.module('adminPanelApp')
	.run(function ($rootScope, $location, PATHS, EVENTS, User, Authentication) {
		// Allow views to access paths directly
		$rootScope.PATHS = {};
		for(var path in PATHS){
			if(PATHS.hasOwnProperty(path)){
				$rootScope.PATHS[path] = '#!' + PATHS[path];
			}
		}

		// Make the User data available globally
		$rootScope.$on(EVENTS.USER_UPDATED, function(event, user){
			$rootScope.User = user;
		});

		// Expose auth methods
		$rootScope.Authentication = Authentication;
	})
	.config(function ($locationProvider) {
		// Set routing mode
		$locationProvider.html5Mode(false);
		$locationProvider.hashPrefix('!');
	});