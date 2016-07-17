import {
  async, ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { By }             from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';
import { newEvent } from '../../test/dom-event';

import { HeroDetailComponent } from './hero-detail.component';
import { TitlecasePipe }       from '../shared/title-case.pipe';

import {
  Hero, HEROES,
  HeroService, FakeHeroService
} from '../../test/fake-hero.service';

import {
  ActivatedRoute, FakeActivatedRoute,
  Router,  FakeRouter
} from '../../test/fake-router';

interface Page {
  gotoBtn: HTMLButtonElement;
  nameDisplay: HTMLElement;
  nameInput: HTMLInputElement;
}

let activatedRoute: FakeActivatedRoute;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let gotoSpy: jasmine.Spy;
let heroService: FakeHeroService;
let navSpy: jasmine.Spy;
let page: Page;
let router: FakeRouter;

function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp = fixture.componentInstance;
  gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
  navSpy = spyOn(router, 'navigate').and.callThrough();

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // got the hero and updated component
    // change detection updates the view
    fixture.detectChanges();
    getPage();
  });

  // get page elements (if there is a hero)
  function getPage() {
    if (comp.hero) {
      page = {
        gotoBtn:  fixture.debugElement.query(By.css('button')).nativeElement,
        nameDisplay: fixture.debugElement.query(By.css('span')).nativeElement,
        nameInput: fixture.debugElement.query(By.css('input')).nativeElement,
      };
    }
  }
}

describe('HeroDetailComponent', () => {

  beforeEach( async(() => {
    activatedRoute = new FakeActivatedRoute();
    heroService = new FakeHeroService();
    router = new FakeRouter;

    // import { ApplicationRef } from '@angular/core';
    // import { AppModule }      from './app.module';
    // TestBed.configureTestingModule({
    //   imports: [AppModule],
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent, TitlecasePipe],
      providers: [
        // Disable module bootstrapping during testing
        // { provide: ApplicationRef, useValue: {bootstrap: () => {}} },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroService, useValue: heroService },
        { provide: Router, useValue: router}
      ]
    })
    .compileComponents();
  }));

  describe('when navigate to hero id=42', () => {
    let expectedHero: Hero;

    beforeEach(async(() => {
      expectedHero = HEROES[0];
      activatedRoute.testParams = { id: expectedHero.id };
      createComponent();
    }));

    it('should display that hero\'s name', () => {
      expect(page.nameDisplay.textContent).toEqual(expectedHero.name);
    });

    it('should convert hero name to Title Case', fakeAsync(() => {
      let inputName = 'quick BROWN  fox';
      let expectedName = 'Quick Brown  Fox';

      fixture.detectChanges();

      // simulate user entering new name in input
      page.nameInput.value = inputName;

      // dispatch a DOM event so that Angular learns of input value change.
      // then wait a tick while ngModel pushes input value to component property.
      // and Angular updates the output span
      page.nameInput.dispatchEvent(newEvent('input'));
      tick();
      fixture.detectChanges();
      expect(page.nameDisplay.textContent).toEqual(expectedName, 'hero name display');
      expect(comp.hero.name).toEqual(inputName, 'comp.hero.name');
    }));

  });

  describe('when navigate with no hero id', () => {
    beforeEach(async(() => {
      createComponent();
    }));

    it('should have hero.id === 0', () => {
      expect(comp.hero.id).toEqual(0);
    });

    it('should display empty hero name', () => {
      expect(page.nameDisplay.textContent).toEqual('');
    });
  });

  describe('when navigate to non-existant hero id', () => {
    beforeEach(async(() => {
      activatedRoute.testParams = { id: 99999 };
      createComponent();
    }));

    it('should try to navigate back to hero list', () => {
      expect(gotoSpy.calls.any()).toEqual(true, 'comp.gotoList called');
      expect(navSpy.calls.any()).toEqual(true, 'router.navigate called');
    });
  });
});
