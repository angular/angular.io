import {
  async, ComponentFixture, TestBed
} from '@angular/core/testing';

// Custom Jasmine Matchers
import  '../../test/jasmine-matchers';

import { By }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import {
  Hero,
  HeroService, FakeHeroService
} from '../../test/fake-hero.service';

class FakeRouter {
  navigate(commands: any[]) { return commands;  }
}

////////  WITHOUT ANGULAR TESTBED ///////
describe('DashboardComponent: w/o Angular TestBed', () => {
  let comp: DashboardComponent;
  let heroService: FakeHeroService;
  let router: Router;

  beforeEach(() => {
    router = new FakeRouter() as any as Router;
    heroService = new FakeHeroService();
    comp = new DashboardComponent(router, heroService);
  });

  it('should NOT have heroes before calling OnInit', () => {
    // custom 'toHaveLength' matcher
    expect(comp.heroes).toHaveLength(0,
      'should not have heroes before OnInit');
  });

  it('should NOT have heroes immediately after OnInit', () => {
    comp.ngOnInit(); // ngOnInit -> getHeroes
    expect(comp.heroes.length).toEqual(0,
      'should not have heroes until service promise resolves');
  });

  it('should HAVE heroes after HeroService gets them', (done: DoneFn) => {
    comp.ngOnInit(); // ngOnInit -> getHeroes
    heroService.lastPromise // the one from getHeroes
      .then(() => {
        // throw new Error('deliberate error'); // see it fail gracefully
        expect(comp.heroes.length).toBeGreaterThan(0,
          'should have heroes after service promise resolves');
      })
      .then(done, done.fail);
  });

  it('should tell ROUTER to navigate by hero id', () => {
    let hero: Hero = {id: 42, name: 'Abbracadabra' };
    let spy = spyOn(router, 'navigate');

    comp.gotoDetail(hero);

    let navArgs = spy.calls.mostRecent().args[0];
    expect(navArgs[0]).toEqual('../heroes/42', 'should nav to HeroDetail for Hero 42');
  });

});

//////  WITH ANGULAR TESTBED ///////
describe('DashboardComponent: with TestBed', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let heroService: FakeHeroService;
  let router: FakeRouter;

  beforeEach( async(() => {
    heroService = new FakeHeroService();
    router = new FakeRouter();

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Router,      useValue: router},
        { provide: HeroService, useValue: heroService }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should NOT have heroes before ngOnInit', () => {
    expect(comp.heroes.length).toEqual(0,
      'should not have heroes before ngOnInit');
  });

  it('should NOT have heroes immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.heroes).toHaveLength(0, // custom 'toHaveLength' matcher
      'should not have heroes until service promise resolves');
  });

  it('should HAVE heroes after HeroService gets them', async(() => {
    fixture.detectChanges();    // runs ngOnInit -> getHeroes

    // whenStable == No need for the `lastPromise` hack!
    // fakeHeroService.lastPromise // the one from getHeroes
    //   .then(() => {
    //     expect(comp.heroes.length).toBeGreaterThan(0,
    //       'should have heroes after service promise resolves');
    //   });

    fixture.whenStable().then(() => {
      expect(comp.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
    });

  }));

  it('should DISPLAY heroes after HeroService gets them', async(() => {
    fixture.detectChanges();    // runs ngOnInit -> getHeroes

    fixture.whenStable().then(() => {
      fixture.detectChanges();      // update bindings

      // Find and examine the displayed heroes
      let heroNames = fixture.debugElement.queryAll(By.css('h4'));
      expect(heroNames.length).toEqual(4, 'should display 4 heroes');

      // the 4th displayed hero should be the 5th fake hero, piped to `uppercase`
      // expect(heroNames[3].nativeElement.textContent)
      //   .toContain(heroService.heroes[4].name.toUpperCase());

      // custom 'toHaveText' matcher
      expect(heroNames[3]).toHaveText(heroService.heroes[4].name.toUpperCase());
    });

  }));

  it('should tell ROUTER to navigate by hero id', () => {

    let spy = spyOn(router, 'navigate');

    let hero: Hero = {id: 42, name: 'Abbracadabra' };
    comp.gotoDetail(hero);

    let navArgs = spy.calls.mostRecent().args[0];
    expect(navArgs[0]).toEqual('../heroes/42', 'should nav to HeroDetail for Hero 42');
  });

});
