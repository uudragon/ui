'use strict';

describe('Controller: ShipCtrl', function () {

  // load the controller's module
  beforeEach(module('mainApp'));

  var ShipCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShipCtrl = $controller('ShipCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
