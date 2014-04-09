'use strict';

angular.module('adminPanelApp')
	.run(function ($rootScope, $location, PATHS, EVENTS, User, Authentication) {
		// Allow views to access paths directly.
		$rootScope.PATHS = {};
		for(var path in PATHS){
			if(PATHS.hasOwnProperty(path)){
				$rootScope.PATHS[path] = '#!' + PATHS[path];
			}
		}

		// Make the user data available globally.
		$rootScope.$on(EVENTS.USER_UPDATED, function(event, user){
			$rootScope.User = user;
		});

		// Expose authentication methods.
		$rootScope.Authentication = Authentication;
	})
	.config(function ($locationProvider, $httpProvider) {
		// Set routing mode
		$locationProvider.html5Mode(false);
		$locationProvider.hashPrefix('!');

		// security measures
		$httpProvider.interceptors.push(function () {
			return {
				request: function (config) {
					if (config.url.slice(0, 5) === '/api/') {
						// Add this header to all calls going through our NodeJS proxy,
						// as a CSRF prevention measurement. For more information see
						// https://tools.mobcastdev.com/jira/browse/CWA-1305
						config.headers['X-Requested-By'] = 'blinkbox';
					}
					return config;
				}
			};
		});
	});