'use strict';

angular.module('adminPanelApp')
  .factory('Authentication', function ($http, $q, $location, User, PATHS, ROUTES, Session) {

    var login = function login(data) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: ROUTES.AUTHENTICATION,
        data: $.param(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (response) {
        Session.get().then(function () {
          User.set(response.data);
          // redirect the user back to where he came from
          var param = $location.search();
          $location.url(param.redirectTo || PATHS.HOME);
          defer.resolve();
        }, function (err) {
          logout();
          defer.reject(err);
        });
      }, defer.reject);
      return defer.promise;
    };

    var logout = function logout() {
      return $http({
        method: 'GET',
        url: ROUTES.SIGNOUT
      }).then(function () {
        // Set user to undefined, erasing all data. Then go to the login page.
        User.set();
        $location.url(PATHS.LOGIN);

        // reset session
        Session.clear();
      });
    };

    return {
      login: login,
      logout: logout
    };
  }
);
