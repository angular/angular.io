import { async, ComponentFixture, TestBed
} from '@angular/core/testing';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';

import { By }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardModule }    from './dashboard.module';

import { HeroService, FakeHeroService
} from '../../test/fake-hero.service';

class FakeRouter {
  navigate(commands: any[]) { return commands;  }
}

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports:   [ DashboardModule ],
      providers: [
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router,      useClass: FakeRouter }
      ]
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should NOT have heroes before ngOnInit', () => {
    expect(comp.heroes.length).toBe(0,
      'should not have heroes before ngOnInit');
  });

  it('should NOT have heroes immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.heroes).toHaveLength(0, // custom 'toHaveLength' matcher
      'should not have heroes until service promise resolves');
  });

  describe('after get dashboard heroes', () => {

     // Trigger component so it gets heroes and binds to them
     beforeEach(async(() => {
        // runs ngOnInit -> getHeroes
        fixture.detectChanges();

        // whenStable == No need for the `lastPromise` hack!
        fixture.whenStable()
          // 2nd detectChanges allows heroes to bind
          .then(() => fixture.detectChanges());
     }));

    it('should HAVE heroes', () => {
      expect(comp.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
    });

    it('should DISPLAY heroes', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      let heroes = fixture.debugElement.queryAll(By.css('.hero'));
      expect(heroes.length).toBe(4, 'should display 4 heroes');
    });

    it('should tell ROUTER to navigate when hero clicked', () => {

      // get the (fake) router injected into the component and spy on it
      let router = fixture.debugElement.injector.get(Router);
      let spy = spyOn(router, 'navigate');

      let heroEl = fixture.debugElement.query(By.css('.hero')); // get first hero DebugElement

      heroEl.triggerEventHandler('click', null);

      let navArgs = spy.calls.first().args[0]; // args passed to router.navigate() == first args of the first call
      let id = comp.heroes[0].id; // expecting to navigate to id of component's first hero

      expect(navArgs[0]).toBe('../heroes/' + id, 'should nav to HeroDetail for first hero');
    });
  });

});
