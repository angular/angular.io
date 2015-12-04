// #docregion top
import '../../app/core/core';
// #enddocregion top

describe('phoneFactory', function() {

  // load modules
  beforeEach(angular.mock.module('phonecat.core'));

  // Test service availability
  it('check the existence of Phone factory', inject(function(Phone) {
    expect(Phone).toBeDefined();
  }));

});
