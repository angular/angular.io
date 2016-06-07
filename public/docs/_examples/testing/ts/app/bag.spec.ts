// Based on https://github.com/angular/angular/blob/master/modules/angular2/test/testing/testing_public_spec.ts
/* tslint:disable */
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

import { DebugElement } from '@angular/core';
import { By }           from '@angular/platform-browser';

import {
  beforeEach, beforeEachProviders,
  describe, ddescribe, xdescribe,
  expect, it, iit, xit,
  async, inject,
  fakeAsync, tick, withProviders
} from '@angular/core/testing';

import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';

import { ViewMetadata }   from '@angular/core';

import { Observable }     from 'rxjs/Rx';

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

describe('using the async helper', () => {
  let actuallyDone = false;

  beforeEach(() => { actuallyDone = false; });

  afterEach(() => { expect(actuallyDone).toEqual(true); });

  it('should run normal test', () => { actuallyDone = true; });

  it('should run normal async test', (done: DoneFn) => {
    setTimeout(() => {
      actuallyDone = true;
      done();
    }, 0);
  });

  it('should run async test with task',
      async(() => { setTimeout(() => { actuallyDone = true; }, 0); }));

  it('should run async test with successful promise', async(() => {
    let p = new Promise(resolve => { setTimeout(resolve, 10); });
    p.then(() => { actuallyDone = true; });
  }));

  it('should run async test with failed promise', async(() => {
    let p = new Promise((resolve, reject) => { setTimeout(reject, 10); });
    p.catch(() => { actuallyDone = true; });
  }));

  it('should run async test with successful Observable', async(() => {
      let source = Observable.of(true).delay(10);
      source.subscribe(
        val => {},
        err => fail(err),
        () => {  actuallyDone = true; } // completed
      );
    }));
});

describe('using the test injector with the inject helper', () => {

  describe('setting up Providers with FancyService', () => {
    beforeEachProviders(() => [
      { provide: FancyService, useValue: new FancyService() }
    ]);

    it('should use FancyService',
      inject([FancyService], (service: FancyService) => {
        expect(service.value).toEqual('real value');
    }));

    it('test should wait for FancyService.getAsyncValue',
      async(inject([FancyService], (service: FancyService) => {
        service.getAsyncValue().then(
          value => { expect(value).toEqual('async value'); });
    })));

    it('test should wait for FancyService.getTimeoutValue',
      async(inject([FancyService], (service: FancyService) => {
        service.getTimeoutValue().then(
          value => { expect(value).toEqual('timeout value'); });
    })));

    it('test should wait for FancyService.getObservableValue',
      async(inject([FancyService], (service: FancyService) => {
        service.getObservableValue().subscribe(
          value => { expect(value).toEqual('observable value'); }
        );
    })));

    it('test should wait for FancyService.getObservableDelayValue',
      async(inject([FancyService], (service: FancyService) => {
        service.getObservableDelayValue().subscribe(
          value => { expect(value).toEqual('observable delay value'); }
        );
    })));

    it('should allow the use of fakeAsync (Experimental)',
      fakeAsync(inject([FancyService], (service: FancyService) => {
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
      beforeEach(async(inject([FancyService], (service: FancyService) => {
        service.getAsyncValue().then(value => { service.value = value; });
      })));

      it('should use asynchronously modified value ... in synchronous test',
          inject([FancyService], (service: FancyService) => {
            expect(service.value).toEqual('async value'); }));
    });
  });

  describe('using `withProviders` for per-test provision', () => {
    it('should inject test-local FancyService for this test',
      // `withProviders`:  set up providers at individual test level
      withProviders(() => [{ provide: FancyService, useValue: {value: 'fake value' }}])

      // now inject and test
        .inject([FancyService], (service: FancyService) => {
          expect(service.value).toEqual('fake value');
        }));
  });
});

describe('test component builder', function() {
  it('should instantiate a component with valid DOM',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.createAsync(ChildComp).then(fixture => {
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('Original Child');
        });
      })));

  it('should allow changing members of the component',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

       tcb.createAsync(MyIfComp).then(fixture => {
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('MyIf()');

          fixture.debugElement.componentInstance.showMore = true;
          fixture.detectChanges();
          expect(fixture.nativeElement).toHaveText('MyIf(More)');
        });
      })));

  it('should support clicking a button',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.createAsync(ButtonComp).then(fixture => {

          let comp = <ButtonComp> fixture.componentInstance;
          expect(comp.wasClicked).toEqual(false, 'wasClicked should be false at start');

          let btn = fixture.debugElement.query(By.css('button'));
          // let btn = fixture.debugElement.query(el => el.name === 'button'); // the hard way

          btn.triggerEventHandler('click', null);
          // btn.nativeElement.click(); // this often works too ... but not all the time!
          expect(comp.wasClicked).toEqual(true, 'wasClicked should be true after click');
        });
      })));

  it('should support entering text in input box (ngModel)',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        let origName = 'John';
        let newName = 'Sally';

        tcb.createAsync(InputComp).then(fixture => {

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
      })));

  it('should override a template',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideTemplate(MockChildComp, '<span>Mock</span>')
            .createAsync(MockChildComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Mock');
            });
      })));

  it('should override a view',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideView(
              ChildComp,
              new ViewMetadata({template: '<span>Modified {{childBinding}}</span>'})
            )
            .createAsync(ChildComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Modified Child');

            });
      })));

  it('should override component directives',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
            .createAsync(ParentComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement).toHaveText('Parent(Mock)');

            });
      })));


  it('should override child component\'s directives',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideDirective(ParentComp, ChildComp, ChildWithChildComp)
            .overrideDirective(ChildWithChildComp, ChildChildComp, MockChildChildComp)
            .createAsync(ParentComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('Parent(Original Child(ChildChild Mock))');

            });
      })));

  it('should override a provider',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideProviders(
              TestProvidersComp,
              [{ provide: FancyService, useClass: MockFancyService }]
            )
            .createAsync(TestProvidersComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('injected value: mocked out value');
            });
      })));

  it('should override a viewProvider',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.overrideViewProviders(
              TestViewProvidersComp,
              [{ provide: FancyService, useClass: MockFancyService }]
            )
            .createAsync(TestViewProvidersComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('injected value: mocked out value');
            });
      })));

  it('should allow an external templateUrl',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

        tcb.createAsync(ExternalTemplateComp)
            .then(fixture => {
              fixture.detectChanges();
              expect(fixture.nativeElement)
                  .toHaveText('from external template\n');
            });
      })), 10000);  // Long timeout because this test makes an actual XHR.

    describe('(lifecycle hooks w/ MyIfParentComp)', () => {
      let fixture: ComponentFixture<MyIfParentComp>;
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
      beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
         tcb.createAsync(MyIfParentComp)
            .then(fix => {
              fixture = fix;
              parent = fixture.debugElement.componentInstance;
            });
      })));

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

      it('changed child value flows to parent', async(() => {
        fixture.detectChanges();
        getChild();

        child.childValue = 'bar';

        return new Promise(resolve => {
          // Wait one JS engine turn!
          setTimeout(() => resolve(), 0);
        }).then(() => {
          fixture.detectChanges();

          expect(child.ngOnChangesCounter).toEqual(2,
            'expected 2 changes: initial value and changed value');
          expect(parent.parentValue).toEqual('bar',
            'parentValue should eq changed parent value');
        });

      }));

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


//////// Testing Framework Bugs? /////
import { HeroService }  from './hero.service';
import { Component }    from '@angular/core';

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
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.overrideProviders(
          AnotherProvidersComp,
          [{ provide: HeroService, useValue: {}} ]
        )
        .createAsync(AnotherProvidersComp);
    })));
});
