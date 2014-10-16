'use strict';

/**
 * The Voucher controller allows to query a specific voucher code.
 * */
angular.module('adminPanelApp')
	.controller('VoucherCtrl', function ($routeParams, $location, $scope, Voucher, Admin, Campaign, PATHS) {
		$scope.code = $routeParams.code;
		function format(code) {
			return code.replace(/\s/g, '');
		}
		$scope.submit = function () {
			$location.path(PATHS.VOUCHER + '/' + $scope.code);
		};
		if ($scope.code) {
			Voucher.get(format($scope.code)).then(function (voucher) {
				$scope.voucher = voucher;
				if (voucher.redeemedByUser) {
					Admin.get(voucher.redeemedByUser, true).then(function (user) {
						$scope.user = user;
					});
				}
				Campaign.get(voucher.campaignId).then(function (campaign) {
					$scope.campaign = campaign;
				});
			}, function () {
				$scope.alert = {
					type: 'danger',
					text: 'Unknown or invalid voucher code.'
				};
			});
		}
	});
