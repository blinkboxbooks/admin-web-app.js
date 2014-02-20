'use strict';

angular.module('mockedResponses', [])
	.value('AuthValid', {
		req: {
			username: 'aaa@bbb.com',
			password: 123123,
			remember_me: false,
			grant_type: 'password'
		},
		res: {
			access_token: 'aaa.bbb-aaa-bbb-ccc',
			expires_in: 1800,
			refresh_token: 'abcabc',
			token_type: 'bearer',
			user_first_name: 'FN',
			user_id: 'urn:blinkbox:zuul:user:xxx',
			user_last_name: 'LN',
			user_uri: 'https://auth.blinkboxbooks.com.internal:8080/users/xxx',
			user_username: 'aaa@bbb.com'
		}
	})
	.value('AuthInvalid', {
		req: {
			username: 'invalid@aaa.com',
			password: 123123,
			remember_me: false,
			grant_type: 'password'
		},
		res: {
			error: 'invalid_grant',
			error_description: 'The username and/or password is incorrect.'
		}
	})
	.value('UserData', {
		user_allow_marketing_communications: true,
		user_first_name: 'FN',
		user_id: 'urn:blinkbox:zuul:user:xxx',
		user_last_name: 'LN',
		user_uri: 'https://auth.blinkboxbooks.com.internal:8080/users/xxx',
		user_username: 'xxx@xxx.com'
	})
	.value('LoginData', {
		email: 'test@test.com',
		password: '123123',
		remember: true
	})
	.value('AdminUsers', {
		'items': [
			{
				'user_id': 'urn:blinkbox:zuul:user:1136',
				'user_uri': '/users/1136',
				'user_username': 'vilmosi@blinkbox.com',
				'user_first_name': 'Vilmos',
				'user_last_name': 'Ioo',
				'user_allow_marketing_communications': true,
				'user_previous_usernames': []
			}
		]
	});