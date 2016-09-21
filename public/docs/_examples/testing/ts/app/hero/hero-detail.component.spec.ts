// #docplaster
import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  addMatchers, newEvent,
  ActivatedRoute, ActivatedRouteStub, Router, RouterStub
} from '../../testing';

import { HEROES, FakeHeroService } from '../model/testing';

import { HeroModule }          from './hero.module';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService }   from './hero-detail.service';
import { Hero, HeroService }   from '../model';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

//////////  Tests  ////////////////////

describe('HeroDetailComponent', () => {

  beforeEach( async(() => {
    addMatchers();
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [ HeroModule ],

      // DON'T RE-DECLARE because already declared in HeroModule
      // declarations: [HeroDetailComponent, TitleCasePipe], // No!

      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroService,    useClass: FakeHeroService },
        { provide: Router,         useClass: RouterStub},
      ]
    })
    .compileComponents();
  }));

  // #docregion route-good-id
  describe('when navigate to hero id=' + HEROES[0].id, () => {
    let expectedHero: Hero;

    beforeEach( async(() => {
      expectedHero = HEROES[0];
      activatedRoute.testParams = { id: expectedHero.id };
      createComponent();
    }));

  // #docregion selected-tests
    it('should display that hero\'s name', () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });
  // #enddocregion route-good-id

    it('should navigate when click cancel', () => {
      page.cancelBtn.triggerEventHandler('click', null);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should save when click save but not navigate immediately', () => {
      page.saveBtn.triggerEventHandler('click', null);
      expect(page.saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      page.saveBtn.triggerEventHandler('click', null);
      tick(); // wait for async save to "complete" before navigating
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    // #docregion title-case-pipe
    it('should convert hero name to Title Case', fakeAsync(() => {
      const inputName = 'quick BROWN  fox';
      const titleCaseName = 'Quick Brown  Fox';

      // simulate user entering new name into the input box
      page.nameInput.value = inputName;

      // dispatch a DOM event so that Angular learns of input value change.
      page.nameInput.dispatchEvent(newEvent('input'));

      // detectChanges() makes [(ngModel)] push input value to component property
      // and Angular updates the output span through the title pipe
      fixture.detectChanges();

      expect(page.nameDisplay.textContent).toBe(titleCaseName);
    }));
    // #enddocregion title-case-pipe
  // #enddocregion selected-tests
  // #docregion route-good-id
  });
  // #enddocregion route-good-id

  // #docregion route-no-id
  describe('when navigate with no hero id', () => {
    beforeEach( async( createComponent ));

    it('should have hero.id === 0', () => {
      expect(comp.hero.id).toBe(0);
    });

    it('should display empty hero name', () => {
      expect(page.nameDisplay.textContent).toBe('');
    });
  });
  // #enddocregion route-no-id

  // #docregion route-bad-id
  describe('when navigate to non-existant hero id', () => {
    beforeEach( async(() => {
      activatedRoute.testParams = { id: 99999 };
      createComponent();
    }));

    it('should try to navigate back to hero list', () => {
      expect(page.gotoSpy.calls.any()).toBe(true, 'comp.gotoList called');
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });
  });
  // #enddocregion route-bad-id

  ///////////////////////////

  // Why we must use `fixture.debugElement.injector` in `Page()`
  it('cannot use `inject` to get component\'s provided service', () => {
    let service: HeroDetailService;
    fixture = TestBed.createComponent(HeroDetailComponent);
    expect(
      // Throws because `inject` only has access to TestBed's injector
      // which is an ancestor of the component's injector
      inject([HeroDetailService], (hds: HeroDetailService) =>  service = hds )
    )
    .toThrowError(/No provider for HeroDetailService/);

    // get `HeroDetailService` with component's own injector
    service = fixture.debugElement.injector.get(HeroDetailService);
    expect(service).toBeDefined('debugElement.injector');
  });
});

/////////// Helpers /////

// #docregion create-component
/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    page.addPageElements();
  });
}
// #enddocregion create-component

// #docregion page
class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;
  saveSpy:      jasmine.Spy;

  saveBtn:      DebugElement;
  cancelBtn:    DebugElement;
  nameDisplay:  HTMLElement;
  nameInput:    HTMLInputElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const hds          = compInjector.get(HeroDetailService);
    const router       = compInjector.get(Router);
    this.gotoSpy       = spyOn(comp, 'gotoList').and.callThrough();
    this.saveSpy       = spyOn(hds, 'saveHero').and.callThrough();
    this.navSpy        = spyOn(router, 'navigate');
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (comp.hero) {
      // have a hero so these elements are now in the DOM
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      this.saveBtn     = buttons[0];
      this.cancelBtn   = buttons[1];
      this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
      this.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
    }
  }
}
// #enddocregion page
