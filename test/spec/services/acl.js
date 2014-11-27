'use strict';

describe('Service: ACL', function () {
  var ACL;

  beforeEach(function(){
    module('adminPanelApp');
    inject(function(_ACL_){
      ACL = _ACL_;
    });
  });

  it('should check is the user has a given role', function () {
    ACL.setRoles('csm');
    expect(ACL.is('csm')).toBe(true);
    expect(ACL.is('csr')).toBe(false);

    ACL.setRoles(['csm', 'csr']);
    expect(ACL.is('csm')).toBe(true);
    expect(ACL.is('csr')).toBe(true);

  });

  it('should check the user has several roles', function () {
    ACL.setRoles('csm');
    expect(ACL.isAll(['csm'])).toBe(true);
    expect(ACL.isAll(['csm', 'csr'])).toBe(false);
    ACL.setRoles(['csm', 'csr']);
    expect(ACL.isAll(['csm', 'csr'])).toBe(true);
  });

  it('should check the user is one of several roles', function () {
    ACL.setRoles('csm');
    expect(ACL.isOneOf(['csm'])).toBe(true);
    expect(ACL.isOneOf(['csm', 'csr'])).toBe(true);
    expect(ACL.isOneOf(['marketing', 'csr'])).toBe(false);
  });



});
