'use strict';

angular.module('adminPanelApp')

	.filter('voucherLabel', function () {
		var labels = {
			Unused: 'label-default',
			Active: 'label-primary',
			Reserved: 'label-info',
			Redeemed: 'label-success',
			Expired: 'label-warning'
		};
		return function (voucher) {
			return labels[voucher.state];
		};
	});
