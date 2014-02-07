'use strict';

angular.module('adminPanelApp')
	.run(function ($rootScope, $location, User, EVENTS) {
		// try and get the current user
		User.get();

		// global User object, available in all views
		$rootScope.User = {
			first_name: '',
			id: '',
			last_name: '',
			username: ''
		};

		$rootScope.$on(EVENTS.USER_UPDATED, function(event, user){
			// save the user
			User.first_name = user ? user.user_first_name : ''
			User.id = user ? user.user_id : ''
			User.last_name = user ? user.user_last_name : ''
			User.username = user ? user.user_username : ''

			// when the user logs in, redirect back to where we came from
			var param = $location.search();
			if(user && param.redirectTo){
				$location.url(param.redirectTo);
			}
		});
	});