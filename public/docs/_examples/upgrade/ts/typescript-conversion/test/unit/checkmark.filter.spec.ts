// #docregion top
import '../../app/js/core/core.module';
// #enddocregion top

describe('checkmarkFilter', function() {

  beforeEach(angular.mock.module('phonecat.core'));

  it('should convert boolean values to unicode checkmark or cross',
      inject(function(checkmarkFilter) {
    expect(checkmarkFilter(true)).toBe('\u2713');
    expect(checkmarkFilter(false)).toBe('\u2718');
  }));

});
