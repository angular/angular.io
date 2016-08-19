import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { Hero, FakeHeroService
} from '../../test/fake-hero.service';

class FakeRouter {
  navigate(commands: any[]) { return commands;  }
}

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
    expect(comp.heroes.length).toBe(0,
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
    const hero = new Hero(42, 'Abbracadabra');
    const spy = spyOn(router, 'navigate');

    comp.gotoDetail(hero);

    const navArgs = spy.calls.mostRecent().args[0];
    expect(navArgs[0]).toBe('../heroes/42', 'should nav to HeroDetail for Hero 42');
  });

});
