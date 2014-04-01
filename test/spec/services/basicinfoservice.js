'use strict';

describe('Service: Basicinfoservice', function () {

  // load the service's module
  beforeEach(module('testApp'));

  // instantiate service
  var Basicinfoservice;
  beforeEach(inject(function (_Basicinfoservice_) {
    Basicinfoservice = _Basicinfoservice_;
  }));

  it('should do something', function () {
    expect(!!Basicinfoservice).toBe(true);
  });

});
