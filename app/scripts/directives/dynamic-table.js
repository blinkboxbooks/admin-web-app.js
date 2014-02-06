'use strict';

angular.module('adminPanelApp')
	.directive('dynamicTable', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/dynamic_table.html',
			scope: {},
			controller: function(){},
			link: function(){}
		};
	});
