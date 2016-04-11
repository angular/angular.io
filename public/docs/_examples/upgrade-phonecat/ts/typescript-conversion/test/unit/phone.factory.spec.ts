// #docregion top
import '../../app/js/core/core.module';
// #enddocregion top

describe('phoneFactory', function() {

  // load modules
  beforeEach(angular.mock.module('phonecat.core'));

  // Test service availability
  it('check the existence of Phone factory', inject(function(Phone) {
    expect(Phone).toBeDefined();
  }));

});
