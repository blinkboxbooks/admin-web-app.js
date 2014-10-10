'use strict';

angular.module('adminPanelApp')

	.filter('voucherLabel', function () {
		return function (voucher) {
			return {
				Unused: 'label-default',
				Active: 'label-primary',
				Reserved: 'label-info',
				Redeemed: 'label-success',
				Expired: 'label-warning'
			}[voucher.state];
		};
	});
