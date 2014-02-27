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
	.value('Session', {
		valid: {
			'token_status': 'VALID',
			'token_elevation': 'CRITICAL',
			'token_elevation_expires_in': 588,
			'user_roles': [
				'csr'
			]
		},
		invalid: {
			'token_status': 'VALID',
			'token_elevation': 'CRITICAL',
			'token_elevation_expires_in': 588
		}
	})
	.value('AdminUsers', {
		'items': [
			{
				"user_id": "urn:blinkbox:zuul:user:814",
				"user_uri": "https://auth.blinkboxbooks.com/users/814",
				"user_username": "john.doe@example.org",
				"user_first_name": "John",
				"user_last_name": "Doe",
				"user_allow_marketing_communications": true,
				"user_previous_usernames": [{
					"user_username": "john.doe.old@example.org",
					"user_username_changed_at": "2014-01-22T09:34:42Z"
				},{
					"user_username": "john.doe.older@example.org",
					"user_username_changed_at": "2013-03-03T16:23:41Z"
				}]
			}
		]
	})
	.value('DataTableUsers', {
		group: [
			{
				'id': '1',
				'first_name': 'AAA',
				'last_name': 'BBB',
				'username': 'aaa@aaa.com'
			},
			{
				'id': '2',
				'first_name': 'AAA',
				'last_name': 'BBB',
				'username': 'aaa@aaa.com'
			}
		],
		single: {
			'id': '2',
			'first_name': 'AAA1',
			'last_name': 'BBB1',
			'username': 'aaa1@aaa.com'
		}
	})
	.value('DataTableConfig', {
		data: [
			{
				'id': '1',
				'first_name': 'AAA',
				'last_name': 'BBB',
				'username': 'aaa@aaa.com'
			},
			{
				'id': '2',
				'first_name': 'AAA',
				'last_name': 'BBB',
				'username': 'aaa@aaa.com'
			}
		],
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
			},
			{
				'field': function(d){
					return '/' + d.id;
				},
				'label': 'Dinamicly generated'
			}
		]
	});