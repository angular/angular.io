// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
/* tslint:disable:no-unused-variable */
import {
  BadTemplateUrl, ButtonComp,
  ChildChildComp, ChildComp, ChildWithChildComp,
  ExternalTemplateComp,
  FancyService, MockFancyService,
  MyIfComp,
  MockChildComp, MockChildChildComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp
} from './public';

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
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { provide }        from 'angular2/core';
import { ViewMetadata }   from 'angular2/core';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { XHR }            from 'angular2/src/compiler/xhr';
import { XHRImpl }        from 'angular2/src/platform/browser/xhr_impl';

/////////// Module Preparation ///////////////////////
interface Done {
    (): void;
    fail: (err: any) => void;
}

////////  SPECS  /////////////

/// Verify can use Angular testing's DOM abstraction to access DOM

describe('angular2 jasmine matchers', () => {
  describe('toHaveCssClass', () => {
    it('should assert that the CSS class is present', () => {
      let el = document.createElement('div');
      el.classList.add('matias');
      expect(el).toHaveCssClass('matias');
    });

    it('should assert that the CSS class is not present', () => {
      let el = document.createElement('div');
      el.classList.add('matias');
      expect(el).not.toHaveCssClass('fatias');
    });
  });

  describe('toHaveCssStyle', () => {
    it('should assert that the CSS style is present', () => {
      let el = document.createElement('div');
      expect(el).not.toHaveCssStyle('width');

      el.style.setProperty('width', '100px');
      expect(el).toHaveCssStyle('width');
    });

    it('should assert that the styles are matched against the element', () => {
      let el = document.createElement('div');
      expect(el).not.toHaveCssStyle({width: '100px', height: '555px'});

      el.style.setProperty('width', '100px');
      expect(el).toHaveCssStyle({width: '100px'});
      expect(el).not.toHaveCssStyle({width: '100px', height: '555px'});

      el.style.setProperty('height', '555px');
      expect(el).toHaveCssStyle({height: '555px'});
      expect(el).toHaveCssStyle({width: '100px', height: '555px'});
    });
  });
});

describe('using the test injector with the inject helper', () => {
  it('should run normal tests', () => { expect(true).toEqual(true); });

  it('should run normal async tests', (done: Done) => {
    setTimeout(() => {
      expect(true).toEqual(true);
      done();
    }, 0);
  });

  it('provides a real XHR instance',
      inject([XHR], (xhr: any) => { expect(xhr).toBeAnInstanceOf(XHRImpl); }));

  describe('setting up Providers with FancyService', () => {
    beforeEachProviders(() => [
      provide(FancyService, {useValue: new FancyService()})
    ]);

    it('should use FancyService',
      inject([FancyService], (service: FancyService) => {
        expect(service.value).toEqual('real value');
    }));

    it('test should wait for FancyService.getAsyncValue',
      injectAsync([FancyService], (service: FancyService) => {
        return service.getAsyncValue().then(
          (value) => { expect(value).toEqual('async value'); });
    }));

    // Experimental: write async tests synchonously by faking async processing
    it('should allow the use of fakeAsync (Experimental)',
      inject([FancyService], fakeAsync((service: FancyService) => {
        let value: any;
        service.getAsyncValue().then((val: any) => value = val);
        tick(); // Trigger JS engine cycle until all promises resolve.
        expect(value).toEqual('async value');
      })));

    describe('using inner beforeEach to inject-and-modify FancyService', () => {
      beforeEach(inject([FancyService], (service: FancyService) => {
        service.value = 'value modified in beforeEach';
      }));

      it('should use modified providers',
        inject([FancyService], (service: FancyService) => {
          expect(service.value).toEqual('value modified in beforeEach');
        }));
    });

    describe('using async within beforeEach', () => {
      beforeEach(injectAsync([FancyService], (service: FancyService) => {
        return service.getAsyncValue().then(value => { service.value = value; });
      }));

      it('should use asynchronously modified value ... in synchronous test',
          inject([FancyService], (service: FancyService) => {
            expect(service.value).toEqual('async value'); }));
    });
  });

  describe('using `withProviders` for per-test provision', () => {
    it('should inject test-local FancyService for this test',
      // `withProviders`:  set up providers at individual test level
      withProviders(() => [provide(FancyService, {useValue: {value: 'fake value'}})])

      // now inject and test
        .inject([FancyService], (service: FancyService) => {
          expect(service.value).toEqual('fake value');
        }));
  });
});

describe('test component builder', function() {
  it('should instantiate a component with valid DOM',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.createAsync(ChildComp).then(fixture => {
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('Original Child');
        });
      }));

  it('should allow changing members of the component',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.createAsync(MyIfComp).then(fixture => {
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('MyIf()');

          fixture.debugElement.componentInstance.showMore = true;
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('MyIf(More)');
        });
      }));

  it('should support clicking a button',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.createAsync(ButtonComp).then(fixture => {

          let comp = <ButtonComp> fixture.componentInstance;
          expect(comp.wasClicked).toEqual(false, 'wasClicked should be false at start');

          let btn = fixture.debugElement.query(el => el.name === 'button');
          btn.triggerEventHandler('click', null);
          // btn.nativeElement.click(); // this works too; which is "better"?
          expect(comp.wasClicked).toEqual(true, 'wasClicked should be true after click');
        });
      }));

  it('should override a template',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideTemplate(MockChildComp, '<span>Mock</span>')
            .createAsync(MockChildComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Mock');
            });
      }));

  it('should override a view',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideView(
              ChildComp,
              new ViewMetadata({template: '<span>Modified {{childBinding}}</span>'})
            )
            .createAsync(ChildComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Modified Child');

            });
      }));

  it('should override component dependencies',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
            .createAsync(ParentComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Parent(Mock)');

            });
      }));


  it('should override child component\'s dependencies',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideDirective(ParentComp, ChildComp, ChildWithChildComp)
            .overrideDirective(ChildWithChildComp, ChildChildComp, MockChildChildComp)
            .createAsync(ParentComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('Parent(Original Child(ChildChild Mock))');

            });
      }));

  it('should override a provider',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideProviders(
              TestProvidersComp,
              [provide(FancyService, {useClass: MockFancyService})]
            )
            .createAsync(TestProvidersComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('injected value: mocked out value');
            });
      }));


  it('should override a viewProvider',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideViewProviders(
              TestViewProvidersComp,
              [provide(FancyService, {useClass: MockFancyService})]
            )
            .createAsync(TestViewProvidersComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('injected value: mocked out value');
            });
      }));

  it('should allow an external templateUrl',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.createAsync(ExternalTemplateComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('from external template\n');
            });
      }), 10000);  // Long timeout because this test makes an actual XHR.
});

describe('errors', () => {
  let originalJasmineIt: any;
  let originalJasmineBeforeEach: any;

  let patchJasmineIt = () => {
    let deferred = PromiseWrapper.completer();
    originalJasmineIt = jasmine.getEnv().it;
    jasmine.getEnv().it = (description: string, fn: Function) => {
      let done = () => { deferred.resolve(); };
      (<any>done).fail = (err: any) => { deferred.reject(err); };
      fn(done);
      return null;
    };
    return deferred.promise;
  };

  let restoreJasmineIt = () => { jasmine.getEnv().it = originalJasmineIt; };

  let patchJasmineBeforeEach = () => {
    let deferred = PromiseWrapper.completer();
    originalJasmineBeforeEach = jasmine.getEnv().beforeEach;
    jasmine.getEnv().beforeEach = (fn: any) => {
      let done = () => { deferred.resolve(); };
      (<any>done).fail = (err: any) => { deferred.reject(err); };
      fn(done);
      return null;
    };
    return deferred.promise;
  };

  let restoreJasmineBeforeEach =
      () => { jasmine.getEnv().beforeEach = originalJasmineBeforeEach; };

  const shouldNotSucceed =
    (done: Done) => () => done.fail( 'Expected function to throw, but it did not');

  const shouldFail =
    (done: Done, emsg: string) => (err: any) => {  expect(err).toEqual(emsg);  done(); };

  it('injectAsync should fail when return was forgotten in it', (done: Done) => {
    let itPromise = patchJasmineIt();
    it('forgets to return a proimse', injectAsync([], () => { return true; }));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done,
        'Error: injectAsync was expected to return a promise, but the  returned value was: true')
    );
    restoreJasmineIt();
  });

  it('inject should fail if a value was returned', (done: Done) => {
    let itPromise = patchJasmineIt();
    it('returns a value', inject([], () => { return true; }));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done,
        'Error: inject returned a value. Did you mean to use injectAsync? Returned value was: true')
    );
    restoreJasmineIt();
  });

  it('injectAsync should fail when return was forgotten in beforeEach', (done: Done) => {
    let beforeEachPromise = patchJasmineBeforeEach();
    beforeEach(injectAsync([], () => { return true; }));

    beforeEachPromise.then(
      shouldNotSucceed(done),
      shouldFail(done,
        'Error: injectAsync was expected to return a promise, but the  returned value was: true')
    );
    restoreJasmineBeforeEach();
  });

  it('inject should fail if a value was returned in beforeEach', (done: Done) => {
    let beforeEachPromise = patchJasmineBeforeEach();
    beforeEach(inject([], () => { return true; }));

    beforeEachPromise.then(
      shouldNotSucceed(done),
      shouldFail(done,
        'Error: inject returned a value. Did you mean to use injectAsync? Returned value was: true')
    );
    restoreJasmineBeforeEach();
  });

  it('should fail when an error occurs inside inject', (done: Done) => {
    let itPromise = patchJasmineIt();

    it('throws an error', inject([], () => { throw new Error('foo'); }));

    itPromise.then(
      shouldNotSucceed(done),
      err => {  expect(err.message).toEqual('foo');  done(); }
    );
    restoreJasmineIt();
  });

  // TODO(juliemr): reenable this test when we are using a test zone and can capture this error.
  xit('should fail when an asynchronous error is thrown', (done: Done) => {
    let itPromise = patchJasmineIt();

    it('throws an async error',
      injectAsync([], () => { setTimeout(() => { throw new Error('bar'); }, 0); }));

    itPromise.then(
      shouldNotSucceed(done),
      err => {  expect(err.message).toEqual('bar');  done(); }
    );
    restoreJasmineIt();
  });

  it('should fail when a returned promise is rejected', (done: Done) => {
    let itPromise = patchJasmineIt();

    it('should fail with an error from a promise', injectAsync([], () => {
      let deferred = PromiseWrapper.completer();
      let p = deferred.promise.then(() => { expect(1).toEqual(2); });

      deferred.reject('baz');
      return p;
    }));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done, 'baz')
    );
    restoreJasmineIt();
  });

  it('should fail when an XHR fails', (done: Done) => {
    let itPromise = patchJasmineIt();

    it('should fail with an error from a promise',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(BadTemplateUrl);
      }));

    itPromise.then(
      shouldNotSucceed(done),
      shouldFail(done, 'Failed to load non-existant.html')
    );
    restoreJasmineIt();
  }, 10000);

  describe('using beforeEachProviders', () => {
    beforeEachProviders(() => [provide(FancyService, {useValue: new FancyService()})]);

    beforeEach(
        inject([FancyService], (service: FancyService) => { expect(service.value).toEqual('real value'); }));

    describe('nested beforeEachProviders', () => {

      it('should fail when the injector has already been used', () => {
        patchJasmineBeforeEach();
        expect(() => {
          beforeEachProviders(() => [provide(FancyService, {useValue: new FancyService()})]);
        })
        .toThrowError('beforeEachProviders was called after the injector had been used ' +
                      'in a beforeEach or it block. This invalidates the test injector');
        restoreJasmineBeforeEach();
      });
    });
  });
});
