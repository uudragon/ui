'use strict';

describe('Filter: week', function () {

  // load the filter's module
  beforeEach(module('testApp'));

  // initialize a new instance of the filter before each test
  var week;
  beforeEach(inject(function ($filter) {
    week = $filter('week');
  }));

  it('should return the input prefixed with "week filter:"', function () {
    var text = 'angularjs';
    expect(week(text)).toBe('week filter: ' + text);
  });

});
