import { async, ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';
import { newEvent } from '../../test/dom-event';

import { HeroModule }         from './hero.module';
import { HeroListComponent }  from './hero-list.component';
import { HighlightDirective } from '../shared/highlight.directive';

import {
  HEROES,
  HeroService, FakeHeroService
} from '../../test/fake-hero.service';

import {
  Router, FakeRouter
} from '../../test/fake-router';

let comp: HeroListComponent;
let fixture: ComponentFixture<HeroListComponent>;
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
  fixture = TestBed.createComponent(HeroListComponent);
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
      imports: [HeroModule],
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
    // selectedHero should be a clone of expectedHero; see FakeHeroService
    expect(comp.selectedHero).toEqual(expectedHero);
  }));

  it('should navigate to selected hero detail on click', fakeAsync(() => {
    let expectedHero = HEROES[1];
    let li = page.heroLis[1];
    li.dispatchEvent(newEvent('click'));
    tick();

    // should have navigated
    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');

    // composed hero detail will be URL like 'heroes/42'
    // expect link array with the route path and hero id
    // first argument to router.navigate is link array
    let navArgs = page.navSpy.calls.first().args[0];
    expect(navArgs[0]).toContain('heroes', 'nav to heroes detail URL');
    expect(navArgs[1]).toBe(expectedHero.id, 'for expected hero.id');

  }));

  it('should find `HighlightDirective` with `By.directive', () => {
    fixture.detectChanges();

    // #docregion by
    // Can find DebugElement either by css selector or by directive
    let h2 = fixture.debugElement.query(By.css('h2'));
    let directive = fixture.debugElement.query(By.directive(HighlightDirective));
    // #enddocregion by
    expect(h2).toBe(directive);
  });

  it('should color header with `HighlightDirective`', () => {
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.directive(HighlightDirective));

    // The HighlightDirective listed in <h2> tokens means it is attached
    expect(el.providerTokens).toContain(HighlightDirective, 'HighlightDirective');

    let h2 = el.nativeElement as HTMLElement;
    expect(h2.style.backgroundColor).toBe('gold', 'backgroundColor');
  });

});
