'use strict';

angular.module('mockData', [])
	.constant('DataTableUsers', {
		group: [
			{
				'first_name': 'AAA',
				'last_name': 'BBB',
				'username': 'aaa@aaa.com'
			}
		],
		single: {
			'first_name': 'AAA1',
			'last_name': 'BBB1',
			'username': 'aaa1@aaa.com'
		}
	});