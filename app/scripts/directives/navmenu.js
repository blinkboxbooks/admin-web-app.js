'use strict';

// aclIf is based on ng-if.
angular.module('adminPanelApp').directive('navmenu', function (PATHS, $location) {
  return {
    restrict: 'E',
    template: '<ul class="nav nav-pills">' +
    '<li ng-repeat="item in items" ng-class="item === active && \'active\'"><a ng-href="#!{{item.href}}">{{item.label}}</a></li>' +
    '</ul>',
    scope: {},
    controller: function($scope){
      $scope.items = [
        {
          label: 'User Search',
          href: PATHS.HOME
        },
        {
          label: 'Voucher Query',
          href: PATHS.VOUCHER
        }
      ];

      // scope active is a reference to current item, undefined by default
      $scope.active = undefined;

      // on route change
      $scope.$on('$routeChangeSuccess', function(){
        var path = $location.path();
        $scope.active = $scope.items.filter(function(item){
          return item.href === path;
        })[0];
      });
    }
  }
});
