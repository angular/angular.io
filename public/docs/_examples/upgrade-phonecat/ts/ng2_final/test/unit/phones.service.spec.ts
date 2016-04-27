// #docregion
import {describe, beforeEachProviders, it, inject} from '@angular/core/testing';
import {HTTP_PROVIDERS} from '@angular/http';
import {Phones} from '../../app/js/core/phones.service';

describe('Phones', () => {

  // load providers
  beforeEachProviders(() => [Phones, HTTP_PROVIDERS]);

  // Test service availability
  it('check the existence of Phones', inject([Phones], (phones) => {
    expect(phones).toBeDefined();
  }));

});
