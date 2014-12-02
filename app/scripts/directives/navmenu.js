'use strict';

// aclIf is based on ng-if.
angular.module('adminPanelApp').directive('navmenu', function (PATHS, $location, EVENTS, ACL) {
  return {
    restrict: 'E',
    template: '<ul class="nav nav-pills">' +
    '<li ng-repeat="item in items" ng-class="item === active && \'active\'"><a ng-href="#!{{item.href}}">{{item.label}}</a></li>' +
    '</ul>',
    scope: {},
    controller: function($scope){

      $scope.items = [];

      var allItems = [
        {
          label: 'User Search',
          href: PATHS.HOME
        },
        {
          label: 'Voucher Query',
          href: PATHS.VOUCHER
        }, {
          label: 'Campaigns',
          href: PATHS.CAMPAIGNS,
          roles: ['csm', 'csr', 'mer', 'mkt']
        }
      ];

      function updateItems(){
        $scope.items = [];
        for(var i = 0; i < allItems.length; i++){
          if(angular.isUndefined(allItems[i].roles) || ACL.isOneOf(allItems[i].roles)){
            $scope.items.push(allItems[i]);
          }
        }
      }

      // scope active is a reference to current item, undefined by default
      $scope.active = undefined;

      // on route change
      $scope.$on('$routeChangeSuccess', function(){
        var path = $location.path();
        $scope.active = allItems.filter(function(item){
          return item.href === path;
        })[0];
      });

      $scope.$on(EVENTS.SESSION_UPDATED, updateItems);


      updateItems();

    }
  };
});
