'use strict';

angular.module('adminPanelApp')
	.directive('addCreditForm', function(Credit, SETTINGS) {
		return {
			restrict: 'E',
			templateUrl: 'views/templates/add_credit_form.html',
			scope: {
				'user': '='
			},
			replace: true,
			controller: function($scope){
				$scope.credit = {
					amount: '',
					reason: '',
					reasons: [
						SETTINGS.CREDIT_REASONS.VIP,
						SETTINGS.CREDIT_REASONS.EMPLOYEE,
						SETTINGS.CREDIT_REASONS.CUSTOMER
					]
				};

				$scope.alert = {
					type: '',
					text: ''
				};

				$scope.addCredit = function(){
					$scope.addCreditForm.submitted = true;
					$scope.alert.text = '';
					if($scope.addCreditForm.$valid){
						// form is valid, add credit to user
						Credit.add($scope.user.id, {
							amount: $scope.credit.amount,
							reason: $scope.credit.reason
						}).then(function(data){
							$scope.user.credit = data;
								$scope.addCreditForm.submitted = false;
								$scope.alert.type = 'success';
								$scope.alert.text = 'Credit added successfully';
						}, function(response){
								$scope.addCreditForm.submitted = false;
								$scope.alert.type = 'danger';
								$scope.alert.text = response.data.error_description || 'Unknown error.';
							});
					}
				};
			},
			link: function($scope){

			}
		};
	});
