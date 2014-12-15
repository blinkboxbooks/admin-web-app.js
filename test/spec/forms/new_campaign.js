'use strict';

describe('Form: New Campaign Form', function () {

  // load module
  beforeEach(function(){
    module('adminPanelApp', 'templates', 'mockedResponses');
    inject(function(_$httpBackend_, _ROUTES_){
      // Save a reference to $httpBackend
      $httpBackend = _$httpBackend_;

      // user is not initially logged in
      _$httpBackend_.expectGET(_ROUTES_.USER).respond(200);
      _$httpBackend_.whenGET(_ROUTES_.SESSION).respond(200);
      _$httpBackend_.whenGET(_ROUTES_.SESSION).respond(200);
      _$httpBackend_.flush();
    });
  });

  var element, scope, $httpBackend, Campaign, $rootScope, newCampaignLocation, newCampaignID, ngDialog, $q;

  var validCampaign = {
    name: 'Test campaign',
    description: 'Test descro[topm',
    startDate: new Date(),
    endDate: new Date() + 1000,
    ongoing: true,
    credit: 23,
    redemptionLimit: null,
    unlimitedRedemption: true,
    enabled: true
  };

  beforeEach(inject(function($compile, _$rootScope_, _Campaign_, _$q_, _ngDialog_){
    Campaign = _Campaign_;
    $rootScope = _$rootScope_;
    newCampaignLocation = '/admin/gifting/vouchercampaigns/44';
    newCampaignID = '44';
    ngDialog = _ngDialog_;
    $q = _$q_;

    spyOn(Campaign, 'post').andCallFake(function(){
      var deferred = $q.defer();
      deferred.resolve(newCampaignLocation);
      return deferred.promise;
    });

    // Compile a piece of HTML containing the directive
    element = $compile('<campaign-form></campaign-form>')($rootScope);

    // Compile
    $rootScope.$apply();

    // Save element scope
    scope = element.isolateScope();
  }));


  describe('Validation', function () {
    beforeEach(function(){
      spyOn(ngDialog, 'openConfirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      });
    });

    it('should not call the Campaign service if the form is not valid', function () {
      // default form is invalid
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
      expect(Campaign.post).not.toHaveBeenCalled();
    });

    it('should call the campaign service if the form is valid', function () {
      scope.campaign = angular.copy(validCampaign);
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();
      $rootScope.$apply(); // resolve confirmation promise
      expect(Campaign.post).toHaveBeenCalled();
    });

    it('should not be valid if the campaign is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.name = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should not be valid if the description is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.description = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should not be valid if the start date is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.startDate = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should not be valid if the ongoing box is unchecked and the end date is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.ongoing = false;
      scope.campaign.endDate = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should be valid if the ongoing box is checked and the end date is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.ongoing = true;
      scope.campaign.endDate = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();
    });

    it('should not be valid if the ongoing box is unchecked and the end date is before the start date', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.ongoing = false;
      scope.campaign.endDate = new Date(scope.campaign.startDate - 1000);
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should not be valid if the unlimited box is unchecked and the redemption limit is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.unlimitedRedemption = false;
      scope.campaign.redemptionLimit = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBe(false);
    });

    it('should be valid if the unlimited box is checked and the redemption limit is not filled in', function () {
      scope.campaign = angular.copy(validCampaign);
      scope.campaign.unlimitedRedemption = true;
      scope.campaign.redemptionLimit = '';
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();
    });

  });

  describe('Declined confirmation popup', function(){
    beforeEach(function(){
      spyOn(ngDialog, 'openConfirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.reject(false);
        return deferred.promise;
      });

      scope.campaign = angular.copy(validCampaign);
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();

    });

    it('should not do POST when user declines confirmation', function () {
      $rootScope.$apply();
      expect(Campaign.post).not.toHaveBeenCalled();
    });
  });

  describe('Accepted confirmation popup', function(){
    beforeEach(function(){
      spyOn(ngDialog, 'openConfirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      });

      scope.campaign = angular.copy(validCampaign);
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();
    });

    it('should do a POST when user agrees confirmation', function () {
      $rootScope.$apply();
      expect(Campaign.post).toHaveBeenCalled();
    });
  });

  describe('Redirection on success', function () {
    var $location, PATHS;
    beforeEach(inject(function(_$location_, _PATHS_){
      $location = _$location_;
      PATHS = _PATHS_;

      spyOn($location, 'path');

      spyOn(ngDialog, 'openConfirm').andCallFake(function(){
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
      });

    }));

    it('should redirect to the campaign id once created', function () {
      scope.campaign = angular.copy(validCampaign);
      $rootScope.$apply();
      expect(scope.submitCampaign(scope.campaign)).toBeTruthy();
      $rootScope.$apply(); // resolve confirmation promise

      expect(Campaign.post).toHaveBeenCalled();

      $rootScope.$apply(); // resolve promises

      expect($location.path).toHaveBeenCalledWith(PATHS.CAMPAIGN + '/' + newCampaignID);
    });
  });



});
