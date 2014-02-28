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
				'user_id': 'urn:blinkbox:zuul:user:814',
				'user_uri': 'https://auth.blinkboxbooks.com/users/814',
				'user_username': 'john.doe@example.org',
				'user_first_name': 'John',
				'user_last_name': 'Doe',
				'user_allow_marketing_communications': true,
				'user_previous_usernames': [{
					'user_username': 'john.doe.old@example.org',
					'user_username_changed_at': '2014-01-22T09:34:42Z'
				},{
					'user_username': 'john.doe.older@example.org',
					'user_username_changed_at': '2013-03-03T16:23:41Z'
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
	})
	.value('PurchaseHistoryData', {
		'type': 'urn:blinkboxbooks:schema:admin:purchase-history',
		'id': '123',
		'count': '1',
		'total': '10',
		'clubcardPoints': '42',
		'purchases': [
			{
				'type': 'urn:blinkboxbooks:schema:admin:purchase',
				'id': '123',
				'isbn': '9780141974132',
				'price': {
					'amount': '4.00',
					'currency': 'GBP'
				},
				'clubcardPointsAward': '42',
				'date': '2013-08-05T12:00:00+01:00',
				'payments': [
					{
						'type': 'urn:blinkboxbooks:schema:admin:payment',
						'name': 'braintree',
						'money': {
							'amount': '1.00',
							'currency': 'GBP'
						},
						'receipt': 'ab123'
					},
					{
						'type': 'urn:blinkboxbooks:schema:admin:payment',
						'name': 'credit-balance',
						'money': {
							'amount': '3.00',
							'currency': 'GBP'
						}
					}
				]
			}
		]
	})
	.value('BookData', {
		single: {
			'type': 'urn:blinkboxbooks:schema:list',
			'numberOfResults': 1,
			'offset': 0,
			'count': 50,
			'items': [
				{
					'type': 'urn:blinkboxbooks:schema:book',
					'guid': 'urn:blinkboxbooks:id:book:9780141945576',
					'id': '9780141945576',
					'title': 'S.',
					'publicationDate': '2006-10-26',
					'sampleEligible': true,
					'images': [
						{
							'rel': 'urn:blinkboxbooks:image:cover',
							'src': 'http://internal-media.mobcastdev.com/9780/141/945/576/f6ea4e92a90d69e85eed0115ab8908d2.png'
						}
					],
					'links': [
						{
							'rel': 'urn:blinkboxbooks:schema:contributor',
							'href': '/service/catalogue/contributors/b6e7ca446444636ec05ea96dc82c431327beae80',
							'targetGuid': 'urn:blinkboxbooks:id:contributor:b6e7ca446444636ec05ea96dc82c431327beae80',
							'title': 'John Updike'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:synopsis',
							'href': '/service/catalogue/books/9780141945576/synopsis',
							'targetGuid': 'urn:blinkboxbooks:id:synopsis:9780141945576',
							'title': 'Synopsis'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:publisher',
							'href': '/service/catalogue/publishers/1322',
							'targetGuid': 'urn:blinkboxbooks:id:publisher:1322',
							'title': 'Penguin Books Ltd'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:bookpricelist',
							'href': '/service/catalogue/prices?isbn=9780141945576',
							'title': 'Price'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:samplemedia',
							'href': 'http://internal-media.mobcastdev.com/9780/141/945/576/15ccca30535152444a63774de7824744.sample.epub',
							'title': 'Sample'
						}
					]
				}
			]
		},
		group: {
			'type': 'urn:blinkboxbooks:schema:list',
			'numberOfResults': 2,
			'offset': 0,
			'count': 50,
			'items': [
				{
					'type': 'urn:blinkboxbooks:schema:book',
					'guid': 'urn:blinkboxbooks:id:book:9780141945576',
					'id': '9780141945576',
					'title': 'S.',
					'publicationDate': '2006-10-26',
					'sampleEligible': true,
					'images': [
						{
							'rel': 'urn:blinkboxbooks:image:cover',
							'src': 'http://internal-media.mobcastdev.com/9780/141/945/576/f6ea4e92a90d69e85eed0115ab8908d2.png'
						}
					],
					'links': [
						{
							'rel': 'urn:blinkboxbooks:schema:contributor',
							'href': '/service/catalogue/contributors/b6e7ca446444636ec05ea96dc82c431327beae80',
							'targetGuid': 'urn:blinkboxbooks:id:contributor:b6e7ca446444636ec05ea96dc82c431327beae80',
							'title': 'John Updike'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:synopsis',
							'href': '/service/catalogue/books/9780141945576/synopsis',
							'targetGuid': 'urn:blinkboxbooks:id:synopsis:9780141945576',
							'title': 'Synopsis'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:publisher',
							'href': '/service/catalogue/publishers/1322',
							'targetGuid': 'urn:blinkboxbooks:id:publisher:1322',
							'title': 'Penguin Books Ltd'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:bookpricelist',
							'href': '/service/catalogue/prices?isbn=9780141945576',
							'title': 'Price'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:samplemedia',
							'href': 'http://internal-media.mobcastdev.com/9780/141/945/576/15ccca30535152444a63774de7824744.sample.epub',
							'title': 'Sample'
						}
					]
				},
				{
					'type': 'urn:blinkboxbooks:schema:book',
					'guid': 'urn:blinkboxbooks:id:book:9780141904016',
					'id': '9780141904016',
					'title': 'Junky',
					'publicationDate': '2012-08-02',
					'sampleEligible': true,
					'images': [
						{
							'rel': 'urn:blinkboxbooks:image:cover',
							'src': 'http://internal-media.mobcastdev.com/9780/141/904/016/229bf0c1fb7ef2d5478be9f38f071360.png'
						}
					],
					'links': [
						{
							'rel': 'urn:blinkboxbooks:schema:contributor',
							'href': '/service/catalogue/contributors/a8f5cbbd96af0c48775e8d7005471be7ed16343c',
							'targetGuid': 'urn:blinkboxbooks:id:contributor:a8f5cbbd96af0c48775e8d7005471be7ed16343c',
							'title': 'Oliver Harris'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:contributor',
							'href': '/service/catalogue/contributors/00b7ba72a343e3a0ed4b2921f8bacc4005eacb2d',
							'targetGuid': 'urn:blinkboxbooks:id:contributor:00b7ba72a343e3a0ed4b2921f8bacc4005eacb2d',
							'title': 'William S S Burroughs'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:synopsis',
							'href': '/service/catalogue/books/9780141904016/synopsis',
							'targetGuid': 'urn:blinkboxbooks:id:synopsis:9780141904016',
							'title': 'Synopsis'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:publisher',
							'href': '/service/catalogue/publishers/1322',
							'targetGuid': 'urn:blinkboxbooks:id:publisher:1322',
							'title': 'Penguin Books Ltd'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:bookpricelist',
							'href': '/service/catalogue/prices?isbn=9780141904016',
							'title': 'Price'
						},
						{
							'rel': 'urn:blinkboxbooks:schema:samplemedia',
							'href': 'http://internal-media.mobcastdev.com/9780/141/904/016/d330731d81ff557ad3747015db17f51f.sample.epub',
							'title': 'Sample'
						}
					]
				}
			]
		}
	})
	.value('CreditData', {
		'type': 'urn:blinkboxbooks:schema:admin:credit',
		'amount': '4.56',
		'currency': 'GBP'
	});