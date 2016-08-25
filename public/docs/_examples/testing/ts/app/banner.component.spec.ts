import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner.component';

let comp: BannerComponent;
let fixture: ComponentFixture<BannerComponent>;
let el: DebugElement;

describe('BannerComponent', () => {

  beforeEach(() => {
    // declare the component
    fixture = TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
    })
    .createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // find title DebugElement by element name
    el = fixture.debugElement.query(By.css('h1'));
  });

  it('should display original title', () => {
    fixture.detectChanges(); // trigger data binding
    expect(el.nativeElement.textContent).toContain(comp.title);
  });

  it('should display test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // trigger data binding
    expect(el.nativeElement.textContent).toContain('Test Title');
  });
});

/////////  With AutoChangeDetect /////
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('BannerComponent with AutoChangeDetect', () => {

  beforeEach(() => {
    // #docregion ComponentFixtureAutoDetect
    fixture = TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      providers: [
        // trigger OnInit and data binding automatically
        { provide: ComponentFixtureAutoDetect,
          useValue: true }
      ]
    })
    // #enddocregion ComponentFixtureAutoDetect
    .createComponent(BannerComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // find title DebugElement by element name
    el = fixture.debugElement.query(By.css('h1'));
  });

  it('should display original title', () => {
    // No `fixture.detectChanges()` needed
    expect(el.nativeElement.textContent).toContain(comp.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = comp.title;
    comp.title = 'Test Title';

    // Still the old title; Angular didn't hear the change
    expect(el.nativeElement.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = 'Test Title';

    // Must call again because Angular can't hear the change
    fixture.detectChanges();

    expect(el.nativeElement.textContent).toContain(comp.title);
  });
});
