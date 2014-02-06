'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			replace: true,
			controller: function(){},
			link: function(){}
		};
	});
