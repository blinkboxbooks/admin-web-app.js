'use strict';

angular.module('adminPanelApp')
  .controller('MainCtrl', function ($scope) {
		// Prepare dynamic table
		$scope.config = {
			data: [],
			structure: [
				{
					'field': 'id',
					'label': 'ID'
				},
				{
					'field': 'first_name',
					'label': 'First Name'
				},
				{
					'field': 'last_name',
					'label': 'Last Name'
				},
				{
					'field': 'username',
					'label': 'Username'
				}
			]
		};
	});
