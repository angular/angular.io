// #docregion
import {describe, beforeEachProviders, it, inject} from 'angular2/testing';

import OrderByPipe from '../../app/js/phone_list/order_by.pipe';

describe('OrderByPipe', function() {

  let input:any[] = [
    {name: 'Nexus S', snippet: 'The Nexus S Phone', images: []},
    {name: 'Motorola DROID', snippet: 'An Android-for-business smartphone', images: []}
  ];

  beforeEachProviders(() => [OrderByPipe]);

  it('should order by the given property', inject([OrderByPipe], (orderByPipe) => {
    expect(orderByPipe.transform(input, ['name'])).toEqual([input[1], input[0]]);
  }));

});
