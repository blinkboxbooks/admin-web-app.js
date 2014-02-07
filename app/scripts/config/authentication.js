'use strict';

angular.module('adminPanelApp')
	.config(function ($httpProvider, ROUTES) {
		/**
		 * Detects if the request was to check the user status, IGNORE (otherwise we will consider EVERY page as unauthorized because of a basic status check)
		 * @param config the response config object
		 * @returns {boolean} true if the request was just a check
		 * @private
		 */
		var _isPing = function (config) {
			return config.method === 'GET' && config.url === ROUTES.USER;
		};

		/**
		 * Determines if a response received 401 status because of an missing token (user not logged in)
		 * @private
		 */
		var _noTokenPresent = function (response) {
			return response.status === 401 && !_isPing(response.config);
		};

		// listen to all angular http requests and respond to un-authorized requests
		$httpProvider.responseInterceptors.push(['$rootScope', '$location', '$q', '$injector', 'EVENTS', function ($rootScope, $location, $q) {
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

						if (_noTokenPresent(response)) {
							// no token present (not logged in), redirect to signin with a link back to current page
							var current = $location.url();
							if (current.indexOf('/login') !== 0) { // avoid circular reference
								$location.search({redirectTo: encodeURIComponent(current)}).path('/signin').replace(); // added the replace to allow the back button in the browser to come back to the previous page and not to the intercepted one
							}
							return deferred.promise;
						}

						// $q.reject creates a promise that is resolved as rejected with the specified reason. In this case the error callback will be executed.
						return $q.reject(response);
					}
				);
			};
		}]);
	});