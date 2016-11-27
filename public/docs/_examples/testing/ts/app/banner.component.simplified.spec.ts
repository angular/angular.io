// #docplaster
// #docregion
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { BannerComponent } from './banner.component';

describe('BannerComponent (simpified)', () => {

  let comp:    BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let de:      DebugElement;

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

    // trigger change detection to update the view
    fixture.detectChanges();

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));

    // confirm the element's content
    expect(de.nativeElement.textContent).toContain(comp.title);
  });
  // #enddocregion simple-example-it
});
