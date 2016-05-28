import {
  describe,
  beforeEachProviders,
  it,
  inject,
  expect
} from '@angular/core/testing';
import { CheckmarkPipe } from './checkmark.pipe';

describe('CheckmarkPipe', function() {

  beforeEachProviders(() => [CheckmarkPipe]);

  it('should convert boolean values to unicode checkmark or cross',
    inject([CheckmarkPipe], function(checkmarkPipe: CheckmarkPipe) {
      expect(checkmarkPipe.transform(true)).toBe('\u2713');
      expect(checkmarkPipe.transform(false)).toBe('\u2718');
    })
  );

});
