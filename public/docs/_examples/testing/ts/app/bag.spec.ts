// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
/* tslint:disable:no-unused-variable */
import {
  BadTemplateUrl, ButtonComp,
  ChildChildComp, ChildComp, ChildWithChildComp,
  ExternalTemplateComp,
  FancyService, MockFancyService,
  InputComp,
  MyIfComp, MyIfChildComp, MyIfParentComp,
  MockChildComp, MockChildChildComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp
} from './bag';

import { DebugElement } from 'angular2/core';
import { By }           from 'angular2/platform/browser';

import {
  beforeEach, beforeEachProviders, withProviders,
  describe, ddescribe, xdescribe,
  expect, it, iit, xit,
  inject, injectAsync, fakeAsync, tick,
  ComponentFixture, TestComponentBuilder
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
      el.classList.add('bombasto');
      expect(el).toHaveCssClass('bombasto');
    });

    it('should assert that the CSS class is not present', () => {
      let el = document.createElement('div');
      el.classList.add('bombasto');
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

          let btn = fixture.debugElement.query(By.css('button'));
          // let btn = fixture.debugElement.query(el => el.name === 'button'); // the hard way

          btn.triggerEventHandler('click', null);
          // btn.nativeElement.click(); // this often works too ... but not all the time!
          expect(comp.wasClicked).toEqual(true, 'wasClicked should be true after click');
        });
      }));

  it('should support entering text in input box (ngModel)',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        let origName = 'John';
        let newName = 'Sally';

        return tcb.createAsync(InputComp).then(fixture => {

          let comp = <InputComp> fixture.componentInstance;
          expect(comp.name).toEqual(origName, `At start name should be ${origName} `);

          let inputBox = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;
          fixture.detectChanges();
          expect(inputBox.value).toEqual(origName, `At start input box value should be ${origName} `);

          inputBox.value = newName;
          expect(comp.name).toEqual(origName,
           `Name should still be ${origName} after value change, before detectChanges`);

          fixture.detectChanges();
          expect(inputBox.value).toEqual(newName,
          `After value change and detectChanges, name should now be ${newName} `);
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

  it('should override component directives',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        return tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
            .createAsync(ParentComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Parent(Mock)');

            });
      }));


  it('should override child component\'s directives',
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

    describe('(lifecycle hooks w/ MyIfParentComp)', () => {
      let fixture: ComponentFixture;
      let parent:  MyIfParentComp;
      let child:   MyIfChildComp;

      /**
       * Get the MyIfChildComp from parent; fail w/ good message if cannot.
       */
      function getChild() {

        let childDe: DebugElement; // DebugElement that should hold the MyIfChildComp

        // The Hard Way: requires detailed knowledge of the parent template
        try {
          childDe = fixture.debugElement.children[4].children[0];
        } catch (err) { /* we'll report the error */ }

        // DebugElement.queryAll: if we wanted all of many instances:
        childDe = fixture.debugElement
          .queryAll(function (de) { return de.componentInstance instanceof MyIfChildComp; })[0];

        // WE'LL USE THIS APPROACH !
        // DebugElement.query: find first instance (if any)
        childDe = fixture.debugElement
          .query(function (de) { return de.componentInstance instanceof MyIfChildComp; });

        if (childDe && childDe.componentInstance) {
          child = childDe.componentInstance;
        } else {
          fail('Unable to find MyIfChildComp within MyIfParentComp');
        }

        return child;
      }

      // Create MyIfParentComp TCB and component instance before each test (async beforeEach)
      beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
         return tcb.createAsync(MyIfParentComp)
            .then(fix => {
              fixture = fix;
              parent = fixture.debugElement.componentInstance;
            });
      }));

      it('should instantiate parent component', () => {
        expect(parent).not.toBeNull('parent component should exist');
      });

      it('parent component OnInit should NOT be called before first detectChanges()', () => {
        expect(parent.ngOnInitCalled).toEqual(false);
      });

      it('parent component OnInit should be called after first detectChanges()', () => {
        fixture.detectChanges();
        expect(parent.ngOnInitCalled).toEqual(true);
      });

      it('child component should exist after OnInit', () => {
        fixture.detectChanges();
        getChild();
        expect(child instanceof MyIfChildComp).toEqual(true, 'should create child');
      });

      it('should have called child component\'s OnInit ', () => {
        fixture.detectChanges();
        getChild();
        expect(child.ngOnInitCalled).toEqual(true);
      });

      it('child component called OnChanges once', () => {
        fixture.detectChanges();
        getChild();
        expect(child.ngOnChangesCounter).toEqual(1);
      });

      it('changed parent value flows to child', () => {
        fixture.detectChanges();
        getChild();

        parent.parentValue = 'foo';
        fixture.detectChanges();

        expect(child.ngOnChangesCounter).toEqual(2,
          'expected 2 changes: initial value and changed value');
        expect(child.childValue).toEqual('foo',
          'childValue should eq changed parent value');
      });

      it('changed child value flows to parent', injectAsync([], () => {
        fixture.detectChanges();
        getChild();

        child.childValue = 'bar';

        let deferred = PromiseWrapper.completer();
        let p = deferred.promise.then(() => {

          fixture.detectChanges();

          expect(child.ngOnChangesCounter).toEqual(2,
            'expected 2 changes: initial value and changed value');
          expect(parent.parentValue).toEqual('bar',
            'parentValue should eq changed parent value');
        });

        // Wait one JS engine turn!
        setTimeout(() => deferred.resolve(), 0);

        return p;
      }));

/*  Will soon be able to write it like this:
      it('changed child value flows to parent', async(() => {
        fixture.detectChanges();
        getChild();

        child.childValue = 'bar';

        // Wait one JS engine turn!
        setTimeout(() => {
          fixture.detectChanges();
          expect(child.ngOnChangesCounter).toEqual(2,
            'expected 2 changes: initial value and changed value');
          expect(parent.parentValue).toEqual('bar',
            'parentValue should eq changed parent value');
          }, 0);
      }));
*/

      it('clicking "Close Child" triggers child OnDestroy', () => {
        fixture.detectChanges();
        getChild();

        let btn = fixture.debugElement.query(By.css('button'));
        btn.triggerEventHandler('click', null);

        fixture.detectChanges();
        expect(child.ngOnDestroyCalled).toEqual(true);
      });

    });
});

describe('inject/async testing errors', () => {
  let originalJasmineIt: any;
  let originalJasmineBeforeEach: any;

  let patchJasmineIt = () => {
    let deferred = PromiseWrapper.completer();
    originalJasmineIt = jasmine.getEnv().it;
    jasmine.getEnv().it = (description: string, fn: Function): jasmine.Spec => {
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
    jasmine.getEnv().beforeEach = (fn: any): void => {
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


//////// Testing Framework Bugs? /////
import { HeroService }  from './hero.service';
import { Component }    from 'angular2/core';

@Component({
  selector: 'another-comp',
  template: `AnotherProvidersComp()`,
  providers: [FancyService] // <======= BOOM! if we comment out
  // Failed: 'undefined' is not an object (evaluating 'dm.providers.concat')
})
export class AnotherProvidersComp {
  constructor(
    private _heroService: HeroService
    ) {  }
}

describe('tcb.overrideProviders', () => {
  it('Component must have at least one provider else crash',
    injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    return tcb.overrideProviders(
          AnotherProvidersComp,
          [provide(HeroService, {useValue: {}})]
        )
        .createAsync(AnotherProvidersComp);
    }));
});
