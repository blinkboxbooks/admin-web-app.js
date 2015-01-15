'use strict';

angular.module('adminPanelApp')
  .factory('authenticationInterceptor', function ($q, $injector, $location, PATHS) {
    // Listen to all angular $http requests and handle un-authorized requests.
    return {
      'responseError' : function(response){
        if (response.status === 401 || response.status === 403) {
          // Reset user data (retrieve the User service without circular dependency):
          $injector.get('Authentication').logout().then(function(){
            // No token present (not logged in) so redirect to signin with a link back to current page.
            var current = $location.url();
            // Avoid circular reference
            if (current.indexOf(PATHS.LOGIN) !== 0) {
              // We replace the current URL to allow the back button in the browser to come back to the previous page and not to the intercepted one.
              $location.search({redirectTo: encodeURIComponent(current)}).path(PATHS.LOGIN).replace();
            }
          });
        }
        return $q.reject(response);
      }
    };
  })
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authenticationInterceptor');
  })
  .run(function ($rootScope, $location, User) {
    // try and get the current user
    User.refresh();
  });
