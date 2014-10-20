'use strict';

// Create the main app module.
angular.module('adminPanelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
	'ngAnimate',
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
			.when('/user/:id', {
				templateUrl: 'views/user.html',
				controller: 'UserCtrl'
			})
	    .when('/voucher', {
		    templateUrl: 'views/voucher.html',
		    controller: 'VoucherCtrl'
	    })
	    .when('/voucher/:code', {
		    templateUrl: 'views/voucher.html',
		    controller: 'VoucherCtrl'
	    })
			.otherwise({
        redirectTo: '/login'
      });
  })
	.run(function($rootScope){
		$rootScope.version = '@@adminVersion';
		$rootScope.header = 'views/partials/header.html';
		$rootScope.footer = 'views/partials/footer.html';
	});
