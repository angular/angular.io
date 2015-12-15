// #docregion
import {describe, beforeEachProviders, it, inject} from 'angular2/testing';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Phones} from '../../app/js/core/Phones';

describe('Phones', function() {

  // load providers
  beforeEachProviders(() => [Phones, HTTP_PROVIDERS]);

  // Test service availability
  it('check the existence of Phones', inject([Phones], (phones) => {
    expect(phones).toBeDefined();
  }));

});
