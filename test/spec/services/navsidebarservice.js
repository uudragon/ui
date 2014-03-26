'use strict';

describe('Service: sideBarService', function () {

  // load the service's module
  beforeEach(module('testApp'));

  // instantiate service
  var sideBarService;
  beforeEach(inject(function (_sideBarService_) {
    sideBarService = _sideBarService_;
  }));

  it('should do something', function () {
    expect(!!sideBarService).toBe(true);
  });

});
