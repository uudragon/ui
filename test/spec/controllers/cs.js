'use strict';

describe('Controller: CsctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('mainApp'));

  var CsctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsctrlCtrl = $controller('CsctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
