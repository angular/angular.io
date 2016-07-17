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
let fixture: ComponentFixture<HeroListComponent>;
let heroLIs: HTMLLIElement[];
let heroService: FakeHeroService;
let navSpy: jasmine.Spy;
let router: FakeRouter;

function createComponent() {
  fixture = TestBed.createComponent(HeroListComponent);
  comp = fixture.componentInstance;
  navSpy = spyOn(router, 'navigate').and.callThrough();

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // got the heroes and updated component
    // change detection updates the view
    fixture.detectChanges();
    heroLIs = fixture.debugElement.queryAll(By.css('li')).map(de => de.nativeElement);
  });
}

describe('HeroListComponent', () => {

  beforeEach( async(() => {
    heroService = new FakeHeroService();
    router = new FakeRouter;

    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        { provide: HeroService, useValue: heroService },
        { provide: Router,      useValue: router}
      ]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should display heroes', () => {
    expect(heroLIs.length).toBeGreaterThan(0);
  });

  it('1st hero should match 1st test hero', () => {
    let expectedHero = HEROES[0];
    let actualHero = heroLIs[0].textContent;
    expect(actualHero).toContain(expectedHero.id, 'hero.id');
    expect(actualHero).toContain(expectedHero.name, 'hero.name');
  });

  it('should select hero on click', fakeAsync(() => {
    let expectedHero = HEROES[1];
    let li = heroLIs[1];
    li.dispatchEvent(newEvent('click'));
    tick();
    expect(comp.selectedHero).toEqual(expectedHero);
  }));

  it('should navigate to selected hero detail on click', fakeAsync(() => {
    let expectedHero = HEROES[1];
    let li = heroLIs[1];
    li.dispatchEvent(newEvent('click'));
    tick();

    // should have navigated
    expect(navSpy.calls.any()).toEqual(true, 'navigate called');

    // composed hero detail will be URL like 'heroes/42'
    // expect link array with the route path and hero id
    // first argument to router.navigate is link array
    let navArgs = navSpy.calls.first().args[0];
    expect(navArgs[0]).toContain('heroes', 'nav to heroes detail URL');
    expect(navArgs[1]).toEqual(expectedHero.id, 'for expected hero.id');

  }));
});
