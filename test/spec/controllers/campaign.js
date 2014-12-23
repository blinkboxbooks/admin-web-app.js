'use strict';

describe('Controller: CampaignCtrl', function () {

  var CampaignCtrl, campaignId, Campaign, scope, campaignData;


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
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function($httpBackend, ROUTES){
    $httpBackend.expectGET(ROUTES.USER).respond(200);
    $httpBackend.whenGET(ROUTES.SESSION).respond(200);
  }));

  beforeEach(inject(function($controller, $rootScope, $routeParams, _Campaign_, $q) {
    campaignId = 1;
    $routeParams.id = '' + campaignId;
    Campaign = _Campaign_;

    scope = $rootScope.$new();

    spyOn(Campaign, 'get').andCallFake(function(){
      var deferred = $q.defer();
      deferred.resolve(campaignData);
      return deferred.promise;
    });

    spyOn(Campaign, 'put').andCallFake(function(){
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });


    CampaignCtrl = $controller('CampaignCtrl', {
      $scope: scope
    });


    scope.$apply();


  }));

  it('should get the campaign details for the campaign in routeParams', function () {
    expect(Campaign.get).toHaveBeenCalledWith(campaignId);
  });

  it('should allow editing the campaign', function () {
    expect(scope.editCampaign).toBeDefined();
  });

  it('should allow enabling the campaign', function () {
    expect(scope.enableCampaign).toBeDefined();
  });

  describe('Editing the campaign', function(){
    var $location, PATHS;
    beforeEach(inject(function(_$location_, _PATHS_){
      $location = _$location_;
      PATHS = _PATHS_;
      spyOn($location, 'path');
    }));

    it('should go to the campaign edit page for the campaign id', function () {
      scope.editCampaign();
      expect($location.path).toHaveBeenCalled();
      expect($location.path.mostRecentCall.args[0]).toEqual(PATHS.CAMPAIGN + '/' + campaignId + '/edit');
    });
  });

  describe('Enabling and disabling the campaign without server errors', function(){
    beforeEach(inject(function($q, Popup){
      spyOn(Popup, 'confirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      });

      spyOn(Campaign, 'setEnabled').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve();
        return deferred.promise;
      });

    }));

    it('should enable the campaign', function () {
      scope.enableCampaign();
      scope.$apply();
      expect(Campaign.setEnabled).toHaveBeenCalled();
      expect(Campaign.setEnabled.mostRecentCall.args).toEqual([campaignId, true]);
      expect(scope.campaignDetails.enabled).toBe(true);
    });

    it('should disable the campaign', function () {
      scope.disableCampaign();
      scope.$apply();
      expect(Campaign.setEnabled).toHaveBeenCalled();
      expect(Campaign.setEnabled.mostRecentCall.args).toEqual([campaignId, false]);
      expect(scope.campaignDetails.enabled).toBe(false);
    });
  });


  describe('Enabling and disabling the campaign with server errors', function(){
    var Popup;
    beforeEach(inject(function($q, _Popup_){
      Popup = _Popup_;

      spyOn(Popup, 'alert');

      spyOn(Popup, 'confirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      });

      spyOn(Campaign, 'setEnabled').andCallFake(function(){
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;
      });

      spyOn(console, 'error');

      scope.$apply();
    }));


    it('show errors when enabling campaign', function () {
      scope.enableCampaign();
      scope.$apply();
      expect(Campaign.setEnabled).toHaveBeenCalled();
      expect(Campaign.setEnabled.mostRecentCall.args).toEqual([campaignId, true]);
      expect(Popup.alert).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('show errors when disabling campaign', function () {
      scope.disableCampaign();
      scope.$apply();
      expect(Campaign.setEnabled).toHaveBeenCalled();
      expect(Campaign.setEnabled.mostRecentCall.args).toEqual([campaignId, false]);
      expect(Popup.alert).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });
  });

});
