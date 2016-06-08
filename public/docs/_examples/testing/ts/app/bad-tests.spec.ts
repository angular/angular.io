// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
/* tslint:disable:no-unused-variable */
/**
 * Tests that show what goes wrong when the tests are incorrectly written or have a problem
 */
import {
  BadTemplateUrlComp, ButtonComp,
  ChildChildComp, ChildComp, ChildWithChildComp,
  ExternalTemplateComp,
  FancyService, MockFancyService,
  InputComp,
  MyIfComp, MyIfChildComp, MyIfParentComp,
  MockChildComp, MockChildChildComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp
} from './bag';

import { DebugElement } from '@angular/core';
import { By }           from '@angular/platform-browser';

import {
  beforeEach, beforeEachProviders,
  describe, ddescribe, xdescribe,
  expect, it, iit, xit,
  async, inject
} from '@angular/core/testing';

import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';

import { ViewMetadata }   from '@angular/core';
import { Observable }     from 'rxjs/Rx';

////////  SPECS  /////////////

xdescribe('async & inject testing errors', () => {
  let originalJasmineIt: any;
  let originalJasmineBeforeEach: any;

  let patchJasmineIt = () => {
    return new Promise((resolve, reject) => {
      originalJasmineIt = jasmine.getEnv().it;
      jasmine.getEnv().it = (description: string, fn: Function): jasmine.Spec => {
        let done = () => { resolve(); };
        (<any>done).fail = (err: any) => { reject(err); };
        fn(done);
        return null;
      };
    });
  };

  let restoreJasmineIt = () => { jasmine.getEnv().it = originalJasmineIt; };

  let patchJasmineBeforeEach = () => {
    return new Promise((resolve, reject) => {
      originalJasmineBeforeEach = jasmine.getEnv().beforeEach;
      jasmine.getEnv().beforeEach = (fn: any): void => {
        let done = () => { resolve(); };
        (<any>done).fail = (err: any) => { reject(err); };
        fn(done);
        return null;
      };
    });
  };

  let restoreJasmineBeforeEach =
      () => { jasmine.getEnv().beforeEach = originalJasmineBeforeEach; };

  const shouldNotSucceed =
    (done: DoneFn) => () => done.fail( 'Expected an error, but did not get one.');

  const shouldFail =
    (done: DoneFn, emsg: string) => (err: any) => {  expect(err).toEqual(emsg);  done(); };

  it('should fail when an asynchronous error is thrown', (done: DoneFn) => {
    let itPromise = patchJasmineIt();

    it('throws an async error',
        async(inject([], () => { setTimeout(() => { throw new Error('bar'); }, 0); })));

    itPromise.then(
      shouldNotSucceed(done),
      err => {
        expect(err).toEqual('bar');
        done();
      });
    restoreJasmineIt();
  });

  it('should fail when a returned promise is rejected', (done: DoneFn) => {
    let itPromise = patchJasmineIt();

    it('should fail with an error from a promise', async(() => {
      return Promise.reject('baz');
    }));

    itPromise.then(
      shouldNotSucceed(done),
      err => {
        expect(err).toEqual('Uncaught (in promise): baz');
        done();
      });
    restoreJasmineIt();
  });

  it('should fail when an error occurs inside inject', (done: DoneFn) => {
    let itPromise = patchJasmineIt();

    it('throws an error', inject([], () => { throw new Error('foo'); }));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done, 'foo')
    );
    restoreJasmineIt();
  });

  // TODO(juliemr): reenable this test when we are using a test zone and can capture this error.
  it('should fail when an asynchronous error is thrown', (done: DoneFn) => {
    let itPromise = patchJasmineIt();

    it('throws an async error',
      async(inject([], () => { setTimeout(() => { throw new Error('bar'); }, 0); })));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done, 'bar')
    );
    restoreJasmineIt();
  });

  it('should fail when XHR loading of a template fails', (done: DoneFn) => {
    let itPromise = patchJasmineIt();

    it('should fail with an error from a promise',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(BadTemplateUrlComp);
      })));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done, 'Uncaught (in promise): Failed to load non-existant.html')
    );
    restoreJasmineIt();
  }, 10000);

  describe('using beforeEachProviders', () => {
    beforeEachProviders(() => [{ provide: FancyService, useValue: new FancyService() }]);

    beforeEach(
        inject([FancyService], (service: FancyService) => { expect(service.value).toEqual('real value'); }));

    describe('nested beforeEachProviders', () => {

      it('should fail when the injector has already been used', () => {
        patchJasmineBeforeEach();
        expect(() => {
          beforeEachProviders(() => [{ provide: FancyService, useValue: new FancyService() }]);
        })
        .toThrowError('beforeEachProviders was called after the injector had been used ' +
                      'in a beforeEach or it block. This invalidates the test injector');
        restoreJasmineBeforeEach();
      });
    });
  });
});
