// #docregion
import {provide} from '@angular/core';
import {describe, beforeEach, beforeEachProviders, it, inject} from '@angular/core/testing';
import {Http, BaseRequestOptions, ResponseOptions, Response} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Phone, PhoneData} from './phone.service';

describe('Phone', function() {
  var phone;
  var phonesData:PhoneData[] = [
    {name: 'Phone X', snippet: '', images: []},
    {name: 'Phone Y', snippet: '', images: []},
    {name: 'Phone Z', snippet: '', images: []}
  ];
  var mockBackend;

  // load providers
  beforeEachProviders(() => [
    Phone,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, Phone], (_mockBackend_, _phone_) => {
    mockBackend = _mockBackend_;
    phone = _phone_;
  }));

  it('should fetch the phones data from `/phones/phones.json`', (done) => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(phonesData)})));
    });
    phone.query().subscribe(result => {
      expect(result).toEqual(phonesData);
      done();
    });
  });

});
