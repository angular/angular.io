// #docregion
import {describe, beforeEachProviders, it, inject} from 'angular2/testing';

import PhoneFilterPipe from '../../app/js/phone_list/phone_filter.pipe';
import {Phone} from '../../app/js/core/phones.service';

describe('PhoneFilterPipe', () => {

  let phones:Phone[] = [
    {name: 'Nexus S', snippet: 'The Nexus S Phone', images: []},
    {name: 'Motorola DROID', snippet: 'an Android-for-business smartphone', images: []}
  ];

  beforeEachProviders(() => [PhoneFilterPipe]);

  it('should return input when no query', inject([PhoneFilterPipe], (phoneFilterPipe) => {
    expect(phoneFilterPipe.transform(phones, [])).toEqual(phones);
  }));

  it('should match based on name', inject([PhoneFilterPipe], (phoneFilterPipe) => {
    expect(phoneFilterPipe.transform(phones, ['nexus'])).toEqual([phones[0]]);
  }));

  it('should match based on snippet', inject([PhoneFilterPipe], (phoneFilterPipe) => {
    expect(phoneFilterPipe.transform(phones, ['android'])).toEqual([phones[1]]);
  }));

});
