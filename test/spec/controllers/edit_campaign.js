'use strict';

describe('Controller: EditCampaignCtrl', function () {

  var $httpBackend, ROUTES, EditCampaignCtrl, scope, Campaign, $q, $rootScope, campaignData;


  campaignData = {
    'type': 'CreditCampaign',
    'id': 1,
    'name': 'book_sticker_campaign',
    'description': '£5 free credit with book purchase in TESCO',
    'startDate': '2014-11-01T00:00:00.000Z',
    'endDate': '2015-03-13T03:15:00.000Z',
    'enabled': false,
    'totalVoucherCount': 200509,
    'totalRedeemedVoucherCount': 83,
    'createdBy': 41,
    'createdAt': '2014-10-23T16:42:10.000Z',
    'updatedBy': 31592,
    'updatedAt': '2014-12-18T15:42:10.000Z',
    'creditAmount': {'currency': 'GBP', 'amount': 5.0}
  };

  // load module
  beforeEach(function(){
    module('adminPanelApp', 'templates', 'mockedResponses');
    inject(function(_$httpBackend_, _ROUTES_, _$q_, _Campaign_, _$rootScope_){
      $q = _$q_;
      $httpBackend = _$httpBackend_;
      ROUTES = _ROUTES_;
      Campaign = _Campaign_;
      $rootScope = _$rootScope_;
      $httpBackend.expectGET(ROUTES.USER).respond(200);
      $httpBackend.whenGET(ROUTES.SESSION).respond(200);
    });
  });

  beforeEach(inject(function($controller, $routeParams){
    scope = $rootScope.$new();
    $routeParams.id = campaignData.id;

    spyOn(Campaign, 'get').andCallFake(function(){
      var deferred = $q.defer();
      deferred.resolve(campaignData);
      return deferred.promise;
    });

    EditCampaignCtrl = $controller('EditCampaignCtrl', {
      $scope: scope
    });

    scope.$apply();
  }));

  it('should get the campaign it is trying to edit from the routeParams', function () {
    expect(Campaign.get).toHaveBeenCalledWith(campaignData.id);
  });

  it('should set up form data', function () {
    // using json stringify because js equality fails.
    expect(JSON.stringify(scope.campaign)).toEqual(JSON.stringify({
      id: campaignData.id,
      name: campaignData.name,
      description: campaignData.description,
      startDate: new Date(campaignData.startDate),
      endDate: campaignData.endDate ? new Date(campaignData.endDate) : '',
      ongoing: !campaignData.endDate,
      credit: +campaignData.creditAmount.amount,
      redemptionLimit: +campaignData.redemptionLimit,
      unlimitedRedemption: !campaignData.redemptionLimit,
      enabled: campaignData.enabled
    }));
  });


});
