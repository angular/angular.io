// #docregion
import {describe, beforeEachProviders, it, inject} from '@angular/core/testing';

import OrderByPipe from './order-by.pipe';

describe('OrderByPipe', function() {

  let input:any[] = [
    {name: 'Nexus S', snippet: 'The Nexus S Phone', images: []},
    {name: 'Motorola DROID', snippet: 'An Android-for-business smartphone', images: []}
  ];

  beforeEachProviders(() => [OrderByPipe]);

  it('should order by the given property', inject([OrderByPipe], (orderByPipe) => {
    expect(orderByPipe.transform(input, 'name')).toEqual([input[1], input[0]]);
  }));

});
