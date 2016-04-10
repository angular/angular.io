/* tslint:disable:no-unused-variable */
import {
  it,
  iit,
  xit,
  describe,
  ddescribe,
  xdescribe,
  expect,
  fakeAsync,
  tick,
  beforeEach,
  inject,
  injectAsync,
  withProviders,
  beforeEachProviders
} from 'angular2/testing';

import { provide } from 'angular2/core';

import {
  MockBackend,
  MockConnection } from 'angular2/src/http/backends/mock_backend';

import {
  BaseRequestOptions,
  ConnectionBackend,
  Request,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions,
  URLSearchParams,
  HTTP_PROVIDERS,
  XHRBackend,
  Http} from 'angular2/http';

// Add all operators to Observable
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Hero }        from './hero';
import { HeroService } from './http-hero.service';

type HeroData = {id: string, name: string}

const makeHeroData = () => [
  { "id": "1", "name": "Windstorm" },
  { "id": "2", "name": "Bombasto" },
  { "id": "3", "name": "Magneta" },
  { "id": "4", "name": "Tornado" }
];

// HeroService expects response data like {data: {the-data}}
const makeResponseData = (data: {}) => {return { data }; };

////////  SPECS  /////////////
describe('Http-HeroService (mockBackend)', () => {

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, {useClass: MockBackend})
  ]);

  it('can instantiate service when inject service',
    withProviders(() => [HeroService])
      .inject([HeroService], (service: HeroService) => {
        expect(service instanceof HeroService).toBe(true);
  }));


  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new HeroService(http);
    expect(service instanceof HeroService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when getHeroes', () => {
      let backend: MockBackend;
      let service: HeroService;
      let fakeHeroes: HeroData[];
      let response: Response;


      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new HeroService(http);
        fakeHeroes = makeHeroData();
        let options = new ResponseOptions({status: 200, body: {data: fakeHeroes}});
        response = new Response(options);
      }));

      it('should have expected fake heroes (then)', injectAsync([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        return service.getHeroes().toPromise()
        // .then(() => Promise.reject('deliberate'))
          .then(heroes => {
            expect(heroes.length).toEqual(fakeHeroes.length,
              'should have expected no. of heroes');
          });
      }));

      it('should have expected fake heroes (Observable.do)', injectAsync([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        return service.getHeroes()
          .do(heroes => {
            expect(heroes.length).toEqual(fakeHeroes.length,
              'should have expected no. of heroes');
          })
          .toPromise();
      }));


      it('should be OK returning no heroes', injectAsync([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        return service.getHeroes()
          .do(heroes => {
            expect(heroes.length).toEqual(0, 'should have no heroes');
          })
          .toPromise();
      }));

      it('should treat 404 as an Observable error', injectAsync([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        return service.getHeroes()
          .do(heroes => {
            fail('should not respond with heroes');
          })
          .catch(err => {
            expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
            return Observable.of(null); // failure is the expected test result
          })
          .toPromise();
      }));
  });
});
