'use strict';

describe('Service: Popup', function () {
  var Popup, ngDialog, $rootScope;

  // load module
  beforeEach(function(){
    module('adminPanelApp');
  });

  beforeEach(inject(function(_Popup_, _ngDialog_, _$rootScope_){
    Popup = _Popup_;
    ngDialog = _ngDialog_;
    $rootScope = _$rootScope_;

    spyOn(Popup, 'open').andCallThrough();
    spyOn(Popup, 'openConfirm').andCallThrough();
  }));

  it('should expose all ngDialog APIs', function(){
    for(var key in ngDialog){
      if(ngDialog.hasOwnProperty(key)){
        expect(Popup[key]).toBeDefined();
      }
    }
  });

  describe('Alert dialog', function(){
    it('should allow creating an alert dialog with a string message', function () {
      Popup.alert('Hello');
      expect(Popup.open).toHaveBeenCalled();
      var popupOptions = Popup.open.mostRecentCall.args[0];
      expect(popupOptions.template).toEqual($rootScope.templates.alertDefaultPopup);
      expect(popupOptions.scope.message).toEqual('Hello');

    });

    it('should allow creating an alert dialog with a custom template and scope', function () {
      var scope = $rootScope.$new({});
      Popup.alert({
        template: 'customTemplate',
        scope: scope
      });
      expect(Popup.open).toHaveBeenCalled();
      var popupOptions = Popup.open.mostRecentCall.args[0];
      expect(popupOptions.scope.template).toEqual('customTemplate');
      expect(popupOptions.scope).toBe(scope);

    });

    it('should return a promise', function () {
      var promise = Popup.alert('Hello');
      expect(promise.then).toBeDefined();
    });

    it('should allow overriding options', function () {
      Popup.alert('Hello!', {
        template: 'different template'
      });

      expect(Popup.open).toHaveBeenCalled();
      var popupOptions = Popup.open.mostRecentCall.args[0];
      expect(popupOptions.template).toEqual('different template');
    });

  });

  describe('Confirm dialog', function(){
    it('should allow creating a confirmation dialog with a string message', function () {
      Popup.confirm('Hello');
      expect(Popup.openConfirm).toHaveBeenCalled();
      var popupOptions = Popup.openConfirm.mostRecentCall.args[0];
      expect(popupOptions.template).toEqual($rootScope.templates.confirmDefaultPopup);
      expect(popupOptions.scope.message).toEqual('Hello');
    });

    it('should return a promise', function () {
      var promise = Popup.confirm('Hello');
      expect(promise.then).toBeDefined();
    });

    it('should allow using a custom template', function () {
      Popup.confirm({
        template: 'customTemplate'
      });

      expect(Popup.openConfirm).toHaveBeenCalled();
      var popupOptions = Popup.openConfirm.mostRecentCall.args[0];
      expect(popupOptions.scope.template).toEqual('customTemplate');

    });

    it('should allow using a custom scope', function () {
      var scope = $rootScope.$new({});
      Popup.confirm({
        scope: scope,
        template: 'customTemplate'
      });

      expect(Popup.openConfirm).toHaveBeenCalled();
      var popupOptions = Popup.openConfirm.mostRecentCall.args[0];
      expect(popupOptions.template).toEqual($rootScope.templates.confirmDefaultPopup);
      expect(popupOptions.scope.template).toEqual('customTemplate');
      expect(popupOptions.scope).toBe(scope);

    });

    it('should allow overriding options', function () {
      Popup.confirm('Hello!', {
        template: 'different template'
      });

      expect(Popup.openConfirm).toHaveBeenCalled();
      var popupOptions = Popup.openConfirm.mostRecentCall.args[0];
      expect(popupOptions.template).toEqual('different template');
    });

  });

});
