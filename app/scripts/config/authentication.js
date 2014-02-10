'use strict';

angular.module('adminPanelApp')
	.config(function ($httpProvider, PATHS) {
		// listen to all angular http requests and respond to un-authorized requests
		$httpProvider.responseInterceptors.push(['$rootScope', '$location', '$q', function ($rootScope, $location, $q) {
			// The promise contains a response from a request
			return function (promise) {
				return promise.then(
					// success
					function (response) {
						return response;
					},
					// error, detect the response error type and handle it, if necessary
					function (response) {
						var deferred = $q.defer();

						if (response.status === 401) {
							// no token present (not logged in), redirect to signin with a link back to current page
							var current = $location.url();
							if (current.indexOf(PATHS.LOGIN) !== 0) { // avoid circular reference
								$location.search({redirectTo: encodeURIComponent(current)}).path(PATHS.LOGIN).replace(); // added the replace to allow the back button in the browser to come back to the previous page and not to the intercepted one
							}
							return deferred.promise;
						}

						// $q.reject creates a promise that is resolved as rejected with the specified reason. In this case the error callback will be executed.
						return $q.reject(response);
					}
				);
			};
		}]);
	})
	.run(function ($rootScope, $location, User) {
		// try and get the current user
		User.refresh();
	});