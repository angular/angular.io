import {
  async, ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';
import { newEvent } from '../../test/dom-event';

import { HeroModule }          from './hero.module';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService }   from './hero-detail.service';

import { Hero, HEROES, HeroService, FakeHeroService
} from '../../test/fake-hero.service';

import { ActivatedRoute, FakeActivatedRoute, Router, FakeRouter
} from '../../test/fake-router';

////// Testing Vars //////
let activatedRoute: FakeActivatedRoute;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

//////////  Tests  ////////////////////

describe('HeroDetailComponent', () => {

  beforeEach( async(() => {

    activatedRoute = new FakeActivatedRoute();

    TestBed.configureTestingModule({
      imports: [ HeroModule ],

      // DON'T RE-DECLARE because declared in HeroModule
      // declarations: [HeroDetailComponent, TitleCasePipe], // No!

      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroService,    useClass: FakeHeroService },
        { provide: Router,         useClass: FakeRouter},
      ]
    })
    .compileComponents();
  }));

  describe('when navigate to hero id=' + HEROES[0].id, () => {
    let expectedHero: Hero;

    beforeEach(async(() => {
      expectedHero = HEROES[0];
      activatedRoute.testParams = { id: expectedHero.id };
      createComponent();
    }));

    it('should display that hero\'s name', () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      page.cancelBtn.triggerEventHandler('click', null);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should navigate when click save', fakeAsync(() => {
      page.saveBtn.triggerEventHandler('click', null);
      tick(); // waits for async save to "complete" before navigating
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    it('should save when click save', () => {
      page.saveBtn.triggerEventHandler('click', null);
      expect(page.saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
    });

    // #docregion title-case-pipe
    it('should convert original hero name to Title Case', () => {
      expect(page.nameDisplay.textContent).toBe(comp.hero.name);
    });
    // #enddocregion title-case-pipe

    it('should convert hero name to Title Case', fakeAsync(() => {
      let inputName = 'quick BROWN  fox';
      let expectedName = 'Quick Brown  Fox';

      // simulate user entering new name in input
      page.nameInput.value = inputName;

      // dispatch a DOM event so that Angular learns of input value change.
      // detectChanges() makes ngModel push input value to component property
      // and Angular updates the output span
      page.nameInput.dispatchEvent(newEvent('input'));
      fixture.detectChanges();
      expect(page.nameDisplay.textContent).toBe(expectedName, 'hero name display');
      expect(comp.hero.name).toBe(inputName, 'comp.hero.name');
    }));

  });

  describe('when navigate with no hero id', () => {
    beforeEach(async( createComponent ));

    it('should have hero.id === 0', () => {
      expect(comp.hero.id).toBe(0);
    });

    it('should display empty hero name', () => {
      expect(page.nameDisplay.textContent).toBe('');
    });
  });

  describe('when navigate to non-existant hero id', () => {
    beforeEach(async(() => {
      activatedRoute.testParams = { id: 99999 };
      createComponent();
    }));

    it('should try to navigate back to hero list', () => {
      expect(page.gotoSpy.calls.any()).toBe(true, 'comp.gotoList called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
});

/////////// Helpers /////
interface Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;
  saveSpy:      jasmine.Spy;

  saveBtn?:      DebugElement;
  cancelBtn?:    DebugElement;
  nameDisplay?:  HTMLElement;
  nameInput?:    HTMLInputElement;
}

/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  setPage();

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // got the hero and updated component
    // change detection updates the view
    fixture.detectChanges();
    addPageElements();
  });
}

/** Get component and page elements for tests  */
function setPage() {
  // Use component's injector to see the services it injected.
  let compInjector = fixture.debugElement.injector;
  let hds          = compInjector.get(HeroDetailService);
  let router       = compInjector.get(Router);

  page = {
    // Spy on component and injected service methods
    gotoSpy: spyOn(comp, 'gotoList').and.callThrough(),
    saveSpy: spyOn(hds, 'saveHero').and.callThrough(),
    navSpy:  spyOn(router, 'navigate').and.callThrough()
  };
}

/** Add page elements after page initializes  */
function addPageElements() {
  if (comp.hero) {
    // have a hero so these DOM elements can be reached
    let buttons = fixture.debugElement.queryAll(By.css('button'));
    page.saveBtn     = buttons[0];
    page.cancelBtn   = buttons[1];
    page.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
    page.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
  }
}
