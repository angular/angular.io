// #docplaster
// #docregion
// #docregion imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BannerComponent } from './banner.component';
// #enddocregion imports

// #docregion setup
let comp:    BannerComponent;
let fixture: ComponentFixture<BannerComponent>;
let el:      DebugElement;

describe('BannerComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // get title DebugElement by element name
    el = fixture.debugElement.query(By.css('h1'));
  });
// #enddocregion setup
  // #docregion tests
  it('should display original title', () => {
    fixture.detectChanges(); // trigger data binding
    expect(el.nativeElement.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // trigger data binding
    expect(el.nativeElement.textContent).toContain('Test Title');
  });
  // #enddocregion tests
  // #docregion test-w-o-detect-changes
  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.nativeElement.textContent).toEqual('');
  });
  // #enddocregion test-w-o-detect-changes

// #docregion setup
});
// #enddocregion setup

/////////  With AutoChangeDetect /////
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('BannerComponent with AutoChangeDetect', () => {

  beforeEach(() => {
    // #docregion auto-detect
    fixture = TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect,
          useValue: true }
      ]
    })
    // #enddocregion auto-detect
    .createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // find title DebugElement by element name
    el = fixture.debugElement.query(By.css('h1'));
  });

  // #docregion auto-detect-tests
  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(el.nativeElement.textContent).toContain(comp.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = comp.title;
    comp.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(el.nativeElement.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(el.nativeElement.textContent).toContain(comp.title);
  });
  // #enddocregion auto-detect-tests
});


describe('BannerComponent (simpified)', () => {
  // #docregion simple-example-before-each
  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(BannerComponent);

    // get test component from the fixture
    comp = fixture.componentInstance;
  });
  // #enddocregion simple-example-before-each

  // #docregion simple-example-it
  it('should display original title', () => {

    // trigger data binding to update the view
    fixture.detectChanges();

    // find the title element in the DOM using a CSS selector
    el = fixture.debugElement.query(By.css('h1'));

    // confirm the element's content
    expect(el.nativeElement.textContent).toContain(comp.title);
  });
  // #enddocregion simple-example-it
});
