import { Component, DebugElement }   from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';

import { HighlightDirective }        from './highlight.directive';

// Component to test directive
@Component({
  template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>Something Gray</h2>
  <h2>Something White</h2>
  `

})
class TestComponent { }

////// Tests //////////
describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let h2Des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    h2Des = fixture.debugElement.queryAll(By.css('h2'));
  });

  it('should have `HighlightDirective`', () => {
    // The HighlightDirective listed in <h2> tokens means it is attached
    expect(h2Des[0].providerTokens).toContain(HighlightDirective, 'HighlightDirective');
  });

  it('should color first <h2> background "yellow"', () => {
    fixture.detectChanges();
    const h2 = h2Des[0].nativeElement as HTMLElement;
    expect(h2.style.backgroundColor).toBe('yellow');
  });

  it('should color second <h2> background w/ default color', () => {
    fixture.detectChanges();
    const h2 = h2Des[1].nativeElement as HTMLElement;
    expect(h2.style.backgroundColor).toBe(HighlightDirective.defaultColor);
  });

  it('should NOT color third <h2> (no directive)', () => {
    // no directive
    expect(h2Des[2].providerTokens).not.toContain(HighlightDirective, 'HighlightDirective');
    fixture.detectChanges();

    const h2 = h2Des[2].nativeElement as HTMLElement;
    expect(h2.style.backgroundColor).toBe('', 'backgroundColor');
  });
});
