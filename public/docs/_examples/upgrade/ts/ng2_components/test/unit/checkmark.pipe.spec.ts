// #docregion
import {describe, beforeEachProviders, it, inject, expect} from 'angular2/testing';
import {CheckmarkPipe} from '../../app/js/core/checkmark.pipe';

describe('CheckmarkPipe', function() {

  beforeEachProviders(() => [CheckmarkPipe]);

  it('should convert boolean values to unicode checkmark or cross',
      inject([CheckmarkPipe], (checkmarkPipe) => {
    expect(checkmarkPipe.transform(true)).toBe('\u2713');
    expect(checkmarkPipe.transform(false)).toBe('\u2718');
  }));

});
