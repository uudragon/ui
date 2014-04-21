'use strict';

describe('Service: Postservice', function () {

  // load the service's module
  beforeEach(module('mainApp'));

  // instantiate service
  var Postservice;
  beforeEach(inject(function (_Postservice_) {
    Postservice = _Postservice_;
  }));

  it('should do something', function () {
    expect(!!Postservice).toBe(true);
  });

});
