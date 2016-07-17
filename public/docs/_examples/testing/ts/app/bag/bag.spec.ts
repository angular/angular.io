// #docplaster
import {
  BagModule,
  ButtonComp,
  ChildComp,
  FancyService,
  ExternalTemplateComp,
  InputComp,
  MyIfComp, MyIfChildComp, MyIfParentComp,
  ParentComp,
  TestProvidersComp, TestViewProvidersComp,
  ReversePipeComp
} from './bag';

import { By }          from '@angular/platform-browser';
import {
  ApplicationRef,
  DebugElement
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';
import { newEvent } from '../../test/dom-event';

////////  SERVICE SPECS  /////////////
  // #docregion FancyService
describe('use inject helper in beforeEach', () => {
  let service: FancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FancyService] });
    // inject returns a fn; don't forget to call it!
    inject([FancyService], (s: FancyService) => service = s) ();
  });

    it('should use FancyService', () => {
      expect(service.getValue()).toEqual('real value');
  });

  it('should use FancyService', () => {
      expect(service.getValue()).toEqual('real value');
  });

  it('test should wait for FancyService.getAsyncValue', async(() => {
    service.getAsyncValue().then(
      value => expect(value).toEqual('async value')
    );
  }));

  // #docregion getTimeoutValue
  it('test should wait for FancyService.getTimeoutValue', async(() => {
    service.getTimeoutValue().then(
      value => expect(value).toEqual('timeout value')
    );
  }));
  // #enddocregion getTimeoutValue

  it('test should wait for FancyService.getObservableValue', async(() => {
    service.getObservableValue().subscribe(
      value => expect(value).toEqual('observable value')
    );
  }));

  // #enddocregion FancyService
  // See https://github.com/angular/angular/issues/10127
  xit('test should wait for FancyService.getObservableDelayValue', async(() => {
    service.getObservableDelayValue().subscribe(
      value => expect(value).toEqual('observable delay value')
    );
  }));

  it('should allow the use of fakeAsync', fakeAsync(() => {
    let value: any;
    service.getAsyncValue().then((val: any) => value = val);
    tick(); // Trigger JS engine cycle until all promises resolve.
    expect(value).toEqual('async value');
  }));
});

describe('use inject within `it`', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FancyService] });
  });

  it('should use modified providers',
    inject([FancyService], (service: FancyService) => {
      service.setValue('value modified in beforeEach');
      expect(service.getValue()).toEqual('value modified in beforeEach');
    })
  );
});

describe('using async(inject) within beforeEach', () => {
  let serviceValue: string;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FancyService] });
  });

  beforeEach(async(inject([FancyService], (service: FancyService) => {
    service.getAsyncValue().then(value => serviceValue = value);
  })));

  it('should use asynchronously modified value ... in synchronous test', () => {
    expect(serviceValue).toEqual('async value');
  });
});

////////// Fakes ///////////
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'child-comp',
  template: `Fake Child`
})
class FakeChildComp { }

@Component({
  selector: 'child-comp',
  template: `Fake Child(<grandchild-comp></grandchild-comp>)`
})
class FakeChildWithGrandchildComp { }

@Component({
  selector: 'grandchild-comp',
  template: `Fake Grandchild`
})
class FakeGrandchildComp { }

@Injectable()
class FakeFancyService extends FancyService {
  value: string = 'faked value';
}

/////////// Component Tests //////////////////

describe('TestBed Component Tests', function() {

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [BagModule],
        // Disable module bootstrapping during testing
        providers: [{provide: ApplicationRef, useValue: {bootstrap: () => {}}}]
      })
      // Compile everything in BagModule
      .compileComponents();
  }));

  it('should create a component with inline template', () => {
    let fixture = TestBed.createComponent(ChildComp);
    fixture.detectChanges();

    expect(fixture).toHaveText('Original Child');
  });

  it('should create a component with external template', () => {
    let fixture = TestBed.createComponent(ExternalTemplateComp);
    fixture.detectChanges();

    expect(fixture).toHaveText('from external template');
  });

  it('should allow changing members of the component', () => {
    let fixture = TestBed.createComponent(MyIfComp);

    fixture.detectChanges();
    expect(fixture).toHaveText('MyIf()');

    fixture.componentInstance.showMore = true;
    fixture.detectChanges();
    expect(fixture).toHaveText('MyIf(More)');
  });

  // #docregion ButtonComp
  it('should support clicking a button', () => {
    let fixture = TestBed.createComponent(ButtonComp);
    let comp = fixture.componentInstance;

    expect(comp.isOn).toEqual(false, 'isOn starts false');

    let btn = fixture.debugElement.query(By.css('button'));
    // #enddocregion ButtonComp
    // let btn = fixture.debugElement.query(el => el.name === 'button'); // the hard way
    // #docregion ButtonComp
    let span = fixture.debugElement
               .query(By.css('span'))
               .nativeElement as HTMLElement;

    // btn.triggerEventHandler('click', null);
    btn.nativeElement.dispatchEvent(newEvent('click'));

    fixture.detectChanges();

    expect(span.textContent).toMatch(/is on/i,
      'message should say it is on');
  });
  // #enddocregion ButtonComp

  // ngModel is async so we must wait for it with promise-based `whenStable`
  it('should support entering text in input box (ngModel)', async(() => {
    let expectedOrigName = 'John';
    let expectedNewName = 'Sally';

    let fixture = TestBed.createComponent(InputComp);
    fixture.detectChanges();

    let comp = fixture.componentInstance;
    let input = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;

    expect(comp.name).toEqual(expectedOrigName,
      `At start name should be ${expectedOrigName} `);

    // wait until ngModel binds comp.name to input box
    fixture.whenStable().then(() => {
      expect(input.value).toEqual(expectedOrigName,
        `After ngModel updates input box, input.value should be ${expectedOrigName} `);

      // simulate user entering new name in input
      input.value = expectedNewName;

      // that change doesn't flow to the component immediately
      expect(comp.name).toEqual(expectedOrigName,
        `comp.name should still be ${expectedOrigName} after value change, before binding happens`);

      // dispatch a DOM event so that Angular learns of input value change.
      // then wait while ngModel pushes input.box value to comp.name
      input.dispatchEvent(newEvent('input'));
      return fixture.whenStable();
    })
    .then(() => {
      expect(comp.name).toEqual(expectedNewName,
        `After ngModel updates the model, comp.name should be ${expectedNewName} `);
    });
  }));

  // fakeAsync version of ngModel input test enables sync test style
  // synchronous `tick` replaces asynchronous promise-base `whenStable`
  it('should support entering text in input box (ngModel) - fakeAsync', fakeAsync(() => {
    let expectedOrigName = 'John';
    let expectedNewName = 'Sally';

    let fixture = TestBed.createComponent(InputComp);
    fixture.detectChanges();

    let comp =  fixture.componentInstance;
    let input = <HTMLInputElement> fixture.debugElement.query(By.css('input')).nativeElement;

    expect(comp.name).toEqual(expectedOrigName,
      `At start name should be ${expectedOrigName} `);

    // wait until ngModel binds comp.name to input box
    tick();
    expect(input.value).toEqual(expectedOrigName,
      `After ngModel updates input box, input.value should be ${expectedOrigName} `);

    // simulate user entering new name in input
    input.value = expectedNewName;

    // that change doesn't flow to the component immediately
    expect(comp.name).toEqual(expectedOrigName,
      `comp.name should still be ${expectedOrigName} after value change, before binding happens`);

    // dispatch a DOM event so that Angular learns of input value change.
    // then wait a tick while ngModel pushes input.box value to comp.name
    input.dispatchEvent(newEvent('input'));
    tick();
    expect(comp.name).toEqual(expectedNewName,
      `After ngModel updates the model, comp.name should be ${expectedNewName} `);
  }));

  // #docregion ReversePipeComp
  it('ReversePipeComp should convert text to Titlecase', fakeAsync(() => {
    let inputText = 'the quick brown fox.';
    let expectedText = '.xof nworb kciuq eht';

    let fixture = TestBed.createComponent(ReversePipeComp);
    fixture.detectChanges();

    let comp =  fixture.componentInstance;
    let input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    let span =  fixture.debugElement.query(By.css('span')).nativeElement  as HTMLElement;

    // simulate user entering new name in input
    input.value = inputText;

    // dispatch a DOM event so that Angular learns of input value change.
    // then wait a tick while ngModel pushes input.box value to comp.text
    // and Angular updates the output span
    input.dispatchEvent(newEvent('input'));
    tick();
    fixture.detectChanges();
    expect(span.textContent).toEqual(expectedText, 'output span');
    expect(comp.text).toEqual(inputText, 'component.text');
  }));
  // #enddocregion ReversePipeComp
});

describe('TestBed Component Override Tests', function() {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BagModule],
      // Disable module bootstrapping during testing
      providers: [{provide: ApplicationRef, useValue: {bootstrap: () => {}}}]
    });

    TestBed.overrideComponent(ChildComp, {
      set: { template: '<span>Fake</span>' }
    });

    TestBed.overrideComponent(TestProvidersComp, {
      remove: { providers: [FancyService]},
      add:    { providers: [{ provide: FancyService, useClass: FakeFancyService }] },

      // Or replace them all (this component has only one provider)
      // set:    { providers: [{ provide: FancyService, useClass: FakeFancyService }] },
    });

    TestBed.overrideComponent(TestViewProvidersComp, {
      // remove: { viewProviders: [FancyService]},
      // add:    { viewProviders: [{ provide: FancyService, useClass: FakeFancyService }] },

      // Or replace them all (this component has only one viewProvider)
      set:    { viewProviders: [{ provide: FancyService, useClass: FakeFancyService }] },
    });
  });

  beforeEach(async(() => {
    // Fully configured ... time to async compile all components
    TestBed.compileComponents();
  }));

  it('should override ChildComp\'s template', () => {
    let fixture = TestBed.createComponent(ChildComp);
    fixture.detectChanges();
    expect(fixture).toHaveText('Fake');
  });

  it('should override TestProvidersComp\'s FancyService provider', () => {
    let fixture = TestBed.createComponent(TestProvidersComp);
    fixture.detectChanges();
    expect(fixture).toHaveText('injected value: faked value');
  });

  it('should override TestViewProvidersComp\'s FancyService viewProvider', () => {
    let fixture = TestBed.createComponent(TestViewProvidersComp);
    fixture.detectChanges();
    expect(fixture).toHaveText('injected value: faked value');
  });

});

describe('Nested (one-deep) component override', function() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComp, FakeChildComp]
    })
    .compileComponents();
  }));

  it('ParentComp should use Fake Child component', () => {
    let fixture = TestBed.createComponent(ParentComp);
    fixture.detectChanges();
    expect(fixture).toHaveText('Parent(Fake Child)');
  });
});

describe('Nested (two-deep) component override', function() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComp, FakeChildWithGrandchildComp, FakeGrandchildComp]
    })
    .compileComponents();
  }));

  it('should use Fake Grandchild component', () => {
    let fixture = TestBed.createComponent(ParentComp);
    fixture.detectChanges();
    expect(fixture).toHaveText('Parent(Fake Child(Fake Grandchild))');
  });
});

describe('Lifecycle hooks w/ MyIfParentComp', () => {
  let fixture: ComponentFixture<MyIfParentComp>;
  let parent:  MyIfParentComp;
  let child:   MyIfChildComp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MyIfChildComp, MyIfParentComp]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MyIfParentComp);
      parent = fixture.componentInstance;
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

  // must be async test to see child flow to parent
  it('changed child value flows to parent', async(() => {
    fixture.detectChanges();
    getChild();

    child.childValue = 'bar';

    return new Promise(resolve => {
      // Wait one JS engine turn!
      setTimeout(() => resolve(), 0);
    })
    .then(() => {
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

  ////// helpers ///
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
});
