'use strict';

angular.module('adminPanelApp').factory('ACL', function($rootScope, EVENTS) {

    var userRoles = [];

    /**
     * Sets the role of the user
     * @param {string|string[]} role
     */
    function setRoles(role){
      userRoles = typeof role === 'string' ? [role] : role;
    }

    /**
     * Returns the list of roles the user has
     * @returns {Array}
     */
    function getRoles(){
      return userRoles;
    }

    /**
     * Returns true if the user has the role provided
     * @param {string} role The role to check the user has
     * @returns {boolean}
     */
    function is(role){
      return userRoles.indexOf(role) >= 0;
    }

    /**
     * Returns true if the user has all the given roles
     * @param {string[]} roles
     * @returns {boolean}
     */
    function isAll(roles){
      for(var i = 0; i < roles.length; i++){
        if(!is(roles[i])){
          return false;
        }
      }
      return true;
    }

    /**
     * Returns true if the user has one of the given roles
     * @param {string[]} roles
     * @returns {boolean}
     */
    function isOneOf(roles){
      for(var i = 0; i < roles.length; i++){
        if(is(roles[i])){
          return true;
        }
      }
      return false;
    }

    $rootScope.$on(EVENTS.SESSION_UPDATED, function(e, session){
      setRoles(session.user_roles);
    });

    return {
      setRoles: setRoles,
      is: is,
      isAll: isAll,
      isOneOf: isOneOf,
      getRoles: getRoles
    };

  }
);
