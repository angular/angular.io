import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {

  let comp: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let titleEl: DebugElement;

  beforeEach(() => {

    // declare the component
    fixture = TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
    })
    .createComponent(BannerComponent);

    // BannerComponent test instance
    comp = fixture.componentInstance;

    // find DOM element abstraction (DebugElement) by element name
    titleEl = fixture.debugElement.query(By.css('h1'));

  });

  it('should display original title', () => {
    fixture.detectChanges(); // trigger data binding
    expect(titleEl.nativeElement.textContent).toContain(comp.title);
  });

  it('should display test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // trigger data binding
    expect(titleEl.nativeElement.textContent).toContain('Test Title');
  });
});
