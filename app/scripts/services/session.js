'use strict';

angular.module('adminPanelApp').factory('Session', function ($q, $http, ROUTES, $rootScope, EVENTS, ACL) {
  return {
    clear: function(){
      $rootScope.$broadcast(EVENTS.SESSION_UPDATED, {user_roles: []});
    },
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
          ACL.setRoles(session.data.user_roles);

          if (ACL.isOneOf(['ops', 'csm', 'mer', 'csr', 'ctm', 'mkt'])) {
            deferred.resolve(session.data);
          } else {
            ACL.setRoles([]);
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
        return session;
      });
    }
  };
});
