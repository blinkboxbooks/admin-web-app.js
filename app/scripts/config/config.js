'use strict';

angular.module('adminPanelApp')
	.run(function ($rootScope, $location, PATHS, EVENTS, User, Authentication, Session) {
		$rootScope.version = '@@adminVersion';

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

    $rootScope.$on(EVENTS.SESSION_UPDATED, function(event, session){
      $rootScope.user_session = session;
    });

		// Expose the current path on the $rootScope:
		$rootScope.$on('$routeChangeSuccess', function () {
			$rootScope.currentPath = '#!' + $location.path();
		});

		// Expose authentication methods.
		$rootScope.Authentication = Authentication;

		$rootScope.templates = {
			header: 'views/partials/header.html',
			footer: 'views/partials/footer.html',
      spinner: 'views/partials/spinner.html'
		};

    // request user's session
    Session.get();
	})
	.config(function ($routeProvider, $locationProvider, $httpProvider) {
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
      .when('/campaigns', {
        templateUrl: 'views/campaigns.html',
        controller: 'CampaignsCtrl'
      })
      .when('/campaign/:id', {
        templateUrl: 'views/campaign.html',
        controller: 'CampaignCtrl'
      })
			.otherwise({
				redirectTo: '/login'
			});

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
