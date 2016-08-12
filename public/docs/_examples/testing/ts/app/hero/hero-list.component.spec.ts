import {
  async, ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';
import { newEvent } from '../../test/dom-event';

import { HeroListComponent } from './hero-list.component';

import {
  HEROES,
  HeroService, FakeHeroService
} from '../../test/fake-hero.service';

import {
  Router, FakeRouter
} from '../../test/fake-router';

let comp: HeroListComponent;
let page: Page;

/////////// Helpers /////

/** test variables  */
interface Page {
  /** Hero line elements */
  heroLis: HTMLLIElement[];
  /** Spy on router navigate method */
  navSpy: jasmine.Spy;
}

/** Create the component and set the `page` test variables */
function createComponent() {
  let fixture = TestBed.createComponent(HeroListComponent);
  comp = fixture.componentInstance;


  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the heroes and updated component
    // change detection updates the view
    fixture.detectChanges();

    // Get the component's injected router and spy on it
    let router = fixture.debugElement.injector.get(Router);
    let navSpy = spyOn(router, 'navigate').and.callThrough();

    page = {
      heroLis: fixture.debugElement.queryAll(By.css('li')).map(de => de.nativeElement),
      navSpy: navSpy
    };
  });
}

/////// Tests //////

describe('HeroListComponent', () => {

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router,      useClass: FakeRouter}
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should display heroes', () => {
    expect(page.heroLis.length).toBeGreaterThan(0);
  });

  it('1st hero should match 1st test hero', () => {
    let expectedHero = HEROES[0];
    let actualHero = page.heroLis[0].textContent;
    expect(actualHero).toContain(expectedHero.id, 'hero.id');
    expect(actualHero).toContain(expectedHero.name, 'hero.name');
  });

  it('should select hero on click', fakeAsync(() => {
    let expectedHero = HEROES[1];
    let li = page.heroLis[1];
    li.dispatchEvent(newEvent('click'));
    tick();
    expect(comp.selectedHero).toEqual(expectedHero);
  }));

  it('should navigate to selected hero detail on click', fakeAsync(() => {
    let expectedHero = HEROES[1];
    let li = page.heroLis[1];
    li.dispatchEvent(newEvent('click'));
    tick();

    // should have navigated
    expect(page.navSpy.calls.any()).toEqual(true, 'navigate called');

    // composed hero detail will be URL like 'heroes/42'
    // expect link array with the route path and hero id
    // first argument to router.navigate is link array
    let navArgs = page.navSpy.calls.first().args[0];
    expect(navArgs[0]).toContain('heroes', 'nav to heroes detail URL');
    expect(navArgs[1]).toEqual(expectedHero.id, 'for expected hero.id');

  }));
});
