'use strict';

describe('Controller: CampaignsCtrl', function () {

  var $httpBackend, ROUTES, CampaignsCtrl, scope, Campaign, $q, campaignsReturned;

  // load module
  beforeEach(function(){
    module('adminPanelApp', 'templates', 'mockedResponses');
    inject(function(_$httpBackend_, _ROUTES_, _$q_){
      $q = _$q_;
      $httpBackend = _$httpBackend_;
      ROUTES = _ROUTES_;
      $httpBackend.expectGET(ROUTES.USER).respond(200);
      $httpBackend.whenGET(ROUTES.SESSION).respond(200);
    });
  });


  var now = new Date(),
    pastDate = new Date(now.getTime() - 86400000),
    futureDate = new Date(now.getTime() + 86400000),
    activeCampaigns = [{
      'id':1,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'startDate': pastDate, // 1 day in ms in the past
      'enabled':true,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }, {
      'id':2,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'startDate': pastDate, // 1 day in ms in the past,
      'endDate': futureDate,
      'enabled':true,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }],
    pendingCampaigns = [{
      'id':3,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'startDate': futureDate, // 1 day in ms in the past
      'enabled':true,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }, {
      'id':4,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'startDate': futureDate, // 1 day in ms in the past
      'enabled':true,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }],
    expiredCampaigns = [{
      'id':5,
      'name':'book_sticker_campaign',
      'enabled': true,
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'endDate': pastDate, // 1 day in ms in the past
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }, {
      'id':6,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'endDate': pastDate, // 1 day in ms in the past
      'startDate': pastDate,
      'enabled':true,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }],
    disabledCampaigns = [{
      'id':7,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'endDate': futureDate, // 1 day in ms in the past
      'enabled':false,
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }, {
      'id':8,
      'name':'book_sticker_campaign',
      'description':'£5 free credit with book purchase in tesco',
      'action':1,
      'endDate': futureDate, // 1 day in ms in the past
      'createdBy':41,
      'createdAt':'2014-10-23T16:42:10.000Z'
    }],
    allCampaigns = activeCampaigns.concat(pendingCampaigns).concat(expiredCampaigns).concat(disabledCampaigns),
    displayedCampaigns;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Campaign_) {
    scope = $rootScope.$new();
    Campaign = _Campaign_;
    campaignsReturned = {items: []};

    // use a mock campaigns get function
    spyOn(Campaign, 'get').andCallFake(function(){
      var deferred = $q.defer();
      deferred.resolve({items: allCampaigns});
      return deferred.promise;
    });

    CampaignsCtrl = $controller('CampaignsCtrl', {
      $scope: scope
    });

    scope.$apply();

    displayedCampaigns = scope.campaignsTable.data;

  }));

  it('should get list of campaigns', function () {
    expect(Campaign.get).toHaveBeenCalled();
  });

  describe('Campaigns filtering', function(){

    it('should filter campaigns by active', function () {
      scope.flags.activeFilter = 'active';
      scope.$apply();
      expect(scope.campaignsTable.data).toEqual(activeCampaigns);
    });

    it('should filter campaigns by pending', function () {
      scope.flags.activeFilter = 'pending';
      scope.$apply();
      expect(scope.campaignsTable.data).toEqual(pendingCampaigns);
    });

    it('should filter campaigns by expired', function () {
      scope.flags.activeFilter = 'expired';
      scope.$apply();
      expect(scope.campaignsTable.data).toEqual(expiredCampaigns);
    });

    it('should filter campaigns by disabled', function () {
      scope.flags.activeFilter = 'disabled';
      scope.$apply();
      expect(scope.campaignsTable.data).toEqual(disabledCampaigns);
    });

    it('should allow showing all campaigns', function () {
      scope.flags.activeFilter = 'all';
      scope.$apply();
      expect(scope.campaignsTable.data).toEqual(allCampaigns);
    });

  });

  describe('going to a new campaign page', function(){
    var $location, PATHS;
    beforeEach(inject(function(_$location_, _PATHS_){
      $location = _$location_;
      PATHS = _PATHS_;
      spyOn($location, 'path');
    }));

    it('should go to the new campaign page', function () {
      scope.goToNewCampaign();
      expect($location.path).toHaveBeenCalledWith(PATHS.NEW_CAMPAIGN);
    });
  });

  describe('Clicking on a row', function(){
    var $location, PATHS;
    beforeEach(inject(function(_$location_, _PATHS_){
      $location = _$location_;
      PATHS = _PATHS_;
      spyOn($location, 'path');
    }));

    it('should go to the campaign', function () {
      var id = 1;
      scope.rowClickCallback(0, [id]);
      expect($location.path).toHaveBeenCalledWith(PATHS.CAMPAIGN + '/' + id);
    });
  });

  describe('Table data structure', function(){
    it('should have the correct columns', function () {
      var structure = scope.campaignsTable.structure;
      expect(structure[0].field).toBe('id');
      expect(structure[1].field).toBe('name');
      expect(structure[2].field).toBe('description');

      // remaining columns are formatted dates.
      spyOn(Date.prototype, 'toString').andReturn('fakeDateString');

      expect(structure[3].field({startDate: new Date()})).toEqual('fakeDateString');
      expect(structure[4].field({endDate: new Date()})).toEqual('fakeDateString');
      expect(structure[5].field({createdAt: new Date()})).toEqual('fakeDateString');
      expect(structure[6].field({enabled: true})).toEqual('Enabled');
      expect(structure[6].field({enabled: false})).toEqual('Disabled');
    });
  });

});
