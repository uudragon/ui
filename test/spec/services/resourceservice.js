'use strict';

describe('Service: Resourceservice', function () {

  // load the service's module
  beforeEach(module('mainApp'));

  // instantiate service
  var Resourceservice;
  beforeEach(inject(function (_Resourceservice_) {
    Resourceservice = _Resourceservice_;
  }));

  it('should do something', function () {
    expect(!!Resourceservice).toBe(true);
  });

});
