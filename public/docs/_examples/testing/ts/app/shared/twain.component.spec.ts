// #docplaster
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { DebugElement }              from '@angular/core';

import { TwainService }   from './twain.service';
import { TwainComponent } from './twain.component';

describe('TwainComponent', () => {

  let comp: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;

  let spy: jasmine.Spy;
  let twainEl: DebugElement;  // the element with the Twain quote
  let twainService: TwainService; // the actually injected service

  const testQuote = 'Test Quote';

  // #docregion setup
  beforeEach(() => {
    TestBed.configureTestingModule({
       declarations: [ TwainComponent ],
       providers:    [ TwainService ],
    });

    fixture = TestBed.createComponent(TwainComponent);
    comp    = fixture.componentInstance;

    // TwainService actually injected into the component
    twainService = fixture.debugElement.injector.get(TwainService);

    // Setup spy on the `getQuote` method
    // #docregion spy
    spy = spyOn(twainService, 'getQuote')
          .and.returnValue(Promise.resolve(testQuote));
    // #enddocregion spy

    // Get the Twain quote element by CSS selector (e.g., by class name)
    twainEl = fixture.debugElement.query(By.css('.twain'));
  });
  // #enddocregion setup

  // #docregion tests
  function getQuote() { return twainEl.nativeElement.textContent; }

  it('should not show quote before OnInit', () => {
    expect(getQuote()).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges(); // trigger data binding
    // getQuote service is async => still has not returned with quote
    expect(getQuote()).toBe('...', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  // #docregion async-test
  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();          // trigger data binding

    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(getQuote()).toBe(testQuote);
    });
  }));
  // #enddocregion async-test

  // #docregion fake-async-test
  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges(); // trigger data binding
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(getQuote()).toBe(testQuote);
  }));
  // #enddocregion fake-async-test
  // #enddocregion tests

  // #docregion done-test
  it('should show quote after getQuote promise (done)', done => {
    fixture.detectChanges();   // trigger data binding

    // get the spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges(); // update view with quote
      expect(getQuote()).toBe(testQuote);
      done();
    });
  });
  // #enddocregion done-test
});
