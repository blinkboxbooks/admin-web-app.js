'use strict';

// Create the main app module.
angular.module('adminPanelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
	'Constants'
])
  .config(function ($routeProvider) {
		// Define all the routes of the website.
    $routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.otherwise({
        redirectTo: '/'
      });
  });
