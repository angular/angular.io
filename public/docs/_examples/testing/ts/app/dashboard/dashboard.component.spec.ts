import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { addMatchers}      from '../../testing';
import { HeroService }     from '../model';
import { FakeHeroService } from '../model/testing';

import { By }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardModule }    from './dashboard.module';

class FakeRouter {
  navigate(commands: any[]) { return commands;  }
}

beforeEach ( addMatchers );

let comp: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

////////  Deep  ////////////////

describe('DashboardComponent (deep)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DashboardModule ]
    });
  });

  compileAndCreate();

  tests(clickForDeep);

  function clickForDeep() {
    // get first <div class="hero"> DebugElement
    const heroEl = fixture.debugElement.query(By.css('.hero'));
    heroEl.triggerEventHandler('click', null);
  }
});

////////  Shallow ////////////////

import { beforeEachCompileAnything } from '../../testing';

describe('DashboardComponent (shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    });
  });

  beforeEachCompileAnything(); // ignores sub-elements and bindings

  compileAndCreate();

  tests(clickForShallow);

  function clickForShallow() {
    // get first <dashboard-hero> DebugElement
    const heroEl = fixture.debugElement.query(By.css('dashboard-hero'));
    heroEl.triggerEventHandler('selected', comp.heroes[0]);
  }
});

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router,      useClass: FakeRouter }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance;
    });
  }));
}

/**
 * The (almost) same tests for both.
 * Only change: the way that hero is clicked
 */
function tests(heroClick: Function) {

  it('should NOT have heroes before ngOnInit', () => {
    expect(comp.heroes.length).toBe(0,
      'should not have heroes before ngOnInit');
  });

  it('should NOT have heroes immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.heroes.length).toBe(0,
      'should not have heroes until service promise resolves');
  });

  describe('after get dashboard heroes', () => {

     // Trigger component so it gets heroes and binds to them
     beforeEach(async(() => {
        fixture.detectChanges(); // runs ngOnInit -> getHeroes
        fixture.whenStable() // No need for the `lastPromise` hack!
          .then(() => fixture.detectChanges()); // bind to heroes
     }));

    it('should HAVE heroes', () => {
      expect(comp.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
    });

    it('should DISPLAY heroes', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      const heroes = fixture.debugElement.queryAll(By.css('dashboard-hero'));
      expect(heroes.length).toBe(4, 'should display 4 heroes');
    });

    // Trigger (click) event binding on inner <div class="hero">
    it('should tell ROUTER to navigate when hero clicked', () => {

      // get the (fake) router injected into the component and spy on it
      const router = fixture.debugElement.injector.get(Router);
      const spy = spyOn(router, 'navigate');

      heroClick();

      const navArgs = spy.calls.first().args[0]; // args passed to router.navigate() == first args of the first call
      const id = comp.heroes[0].id; // expecting to navigate to id of component's first hero

      expect(navArgs[0]).toBe('../heroes/' + id, 'should nav to HeroDetail for first hero');
    });
  });
}

