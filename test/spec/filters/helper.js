'use strict';

describe('Filter: voucherLabel', function () {

	beforeEach(function(){
		module('adminPanelApp', 'templates', 'mockedResponses');
	});

	it('Should return a label for a given voucher', inject(
		function ($filter, VouchersData) {
			expect($filter('voucherLabel')(VouchersData.items[0])).toBe('label-success');
		}
	));

});
