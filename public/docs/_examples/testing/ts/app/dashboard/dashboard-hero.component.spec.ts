import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';

import { Hero } from '../model/hero';
import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent when tested directly', () => {

  let comp: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl: DebugElement;

  beforeEach(async(() => {

    expectedHero = new Hero(42, 'Test Name');

    // declare the component
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // create the component
    fixture = TestBed.createComponent(DashboardHeroComponent);

    // pretend that was wired to something that supplied a hero
    comp = fixture.componentInstance;
    comp.hero = expectedHero;

    // trigger data binding (because Angular doesn't know the model changed)
    fixture.detectChanges();

    // find DOM element abstraction (DebugElement) for hero by CSS class name
    heroEl = fixture.debugElement.query(By.css('.hero'));

  });

  it('should display hero name', () => {
    let expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    let selectedHero: Hero;

    comp.selected.subscribe((hero: Hero) => {
      selectedHero = hero;
    });

    heroEl.triggerEventHandler('click', null);

    expect(selectedHero).toBe(expectedHero);
  });

});

//////////////////

////// Test Wrapper Component //////
import { Component } from '@angular/core';

@Component({
  template: '<dashboard-hero [hero]="hero" (selected)="onSelected($event)"></dashboard-hero>'
})
class TestWrapper {
  hero = new Hero(42, 'Test Name');
  selectedHero: Hero;

  onSelected(hero: Hero) { this.selectedHero = hero; }
}
///////////////////

describe('DashboardHeroComponent when inside TestWrapper', () => {
  let wrapper: TestWrapper;
  let fixture: ComponentFixture<TestWrapper>;
  let heroEl: DebugElement;

  beforeEach(async(() => {

    // declare the components
    TestBed.configureTestingModule({
      declarations: [ TestWrapper, DashboardHeroComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // create the TestWrapper component
    fixture = TestBed.createComponent(TestWrapper);
    wrapper = fixture.componentInstance;

    // trigger initial data binding
    fixture.detectChanges();

    // find DOM element abstraction (DebugElement) for hero by CSS class name
    heroEl = fixture.debugElement.query(By.css('.hero'));

  });

  it('should display hero name', () => {
    let expectedPipedName = wrapper.hero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {

    heroEl.triggerEventHandler('click', null);

    // selected hero should be the same data bound hero
    expect(wrapper.selectedHero).toBe(wrapper.hero);
  });

});
