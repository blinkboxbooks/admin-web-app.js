'use strict';

angular.module('adminPanelApp').factory('Session', function ($q, $http, ROUTES, $rootScope, EVENTS) {
  return {
    get: function () {

      return $http({
        method: 'GET',
        url: ROUTES.SESSION,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (session) {
        var deferred = $q.defer();

        if (session.data && angular.isArray(session.data.user_roles)) {
          var valid = false;
          for (var i = 0, l = session.data.user_roles.length; i < l; i++) {
            var role = session.data.user_roles[i];
            if (role === 'csr' || role === 'csm' || role === 'ops') {
              valid = true;
              break;
            }
          }


          // TODO later we'll refactor what it means to be 'valid'.
          if (valid) {
            deferred.resolve(session.data);
          } else {
            deferred.reject({
              data: {
                error_description: 'You must have CSM/CSR account in order to access the admin panel.'
              }
            });
          }
        } else {
          deferred.reject({
            data: {
              error_description: 'You must have CSM/CSR account in order to access the admin panel.'
            }
          });
        }

        return deferred.promise;
      }).then(function(session){
        $rootScope.$broadcast(EVENTS.SESSION_UPDATED, session);
      });
    }
  };
});
