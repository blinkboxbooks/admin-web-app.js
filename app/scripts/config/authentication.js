'use strict';

angular.module('adminPanelApp')
	.config(function ($httpProvider) {
		// Listen to all angular $http requests and handle un-authorized requests.
		$httpProvider.interceptors.push('authenticationInterceptor');
	})
  .factory('authenticationInterceptor', function($q, $rootScope, $location, PATHS){
    return {
      'responseError': function(rejection){
        if (rejection.status === 401 || rejection.status === 403) {
          // No token present (not logged in) so redirect to signin with a link back to current page.
          var current = $location.url();
          // Avoid circular reference
          if (current.indexOf(PATHS.LOGIN) !== 0) {
            // We replace the current URL to allow the back button in the browser to come back to the previous page and not to the intercepted one.
            $location.search({redirectTo: encodeURIComponent(current)}).path(PATHS.LOGIN).replace();
          }
        }

        // $q.reject creates a promise that is resolved as rejected with the specified reason. In this case the error callback will be executed.
        return $q.reject(rejection);
      }
    };
  })
	.run(function ($rootScope, $location, User) {
		// try and get the current user
		User.refresh();
	});
