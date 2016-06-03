/* tslint:disable:no-unused-variable */
import { DashboardComponent } from './dashboard.component';

import { By }       from '@angular/platform-browser';

import {
  beforeEach, beforeEachProviders,
  describe, ddescribe, xdescribe,
  expect, it, iit, xit,
  async, inject
} from '@angular/core/testing';

import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';

import { Hero, HeroService, MockHeroService } from './mock-hero.service';
import { Router, MockRouter } from './mock-router';

describe('DashboardComponent', () => {

  ////////  WITHOUT ANGULAR INVOLVED ///////
  describe('w/o Angular', () => {
    let comp: DashboardComponent;
    let mockHeroService: MockHeroService;
    let router: MockRouter;

    beforeEach(() => {
      router = new MockRouter();
      mockHeroService = new MockHeroService();
      comp = new DashboardComponent(router, mockHeroService);
    });

    it('should NOT have heroes before calling OnInit', () => {
      expect(comp.heroes.length).toEqual(0,
        'should not have heroes before OnInit');
    });

    it('should NOT have heroes immediately after OnInit', () => {
      comp.ngOnInit(); // ngOnInit -> getHeroes
      expect(comp.heroes.length).toEqual(0,
        'should not have heroes until service promise resolves');
    });

    it('should HAVE heroes after HeroService gets them', (done: DoneFn) => {
      comp.ngOnInit(); // ngOnInit -> getHeroes
      mockHeroService.lastPromise // the one from getHeroes
        .then(() => {
          // throw new Error('deliberate error'); // see it fail gracefully
          expect(comp.heroes.length).toBeGreaterThan(0,
            'should have heroes after service promise resolves');
        })
        .then(done, done.fail);
    });

    it('should tell ROUTER to navigate by hero id', () => {
      let hero: Hero = {id: 42, name: 'Abbracadabra' };
      let spy = spyOn(router, 'navigate').and.callThrough();

      comp.gotoDetail(hero);

      let linkParams = spy.calls.mostRecent().args[0];
      expect(linkParams[0]).toEqual('HeroDetail', 'should nav to "HeroDetail"');
      expect(linkParams[1].id).toEqual(hero.id, 'should nav to fake hero\'s id');
    });

  });


  //////  WITH ANGULAR TEST INFRASTRUCTURE ///////
  describe('using TCB', () => {
    let comp: DashboardComponent;
    let mockHeroService: MockHeroService;

    beforeEachProviders(() => {
      mockHeroService = new MockHeroService();
      return [
        { provide: Router,      useClass: MockRouter},
        { provide: MockRouter,  useExisting: Router},
        { provide: HeroService, useValue: mockHeroService }
      ];
    });

    it('can instantiate it',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      tcb.createAsync(DashboardComponent);
    })));

    it('should NOT have heroes before OnInit',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      tcb.createAsync(DashboardComponent).then(fixture => {
        comp = fixture.debugElement.componentInstance;

        expect(comp.heroes.length).toEqual(0,
          'should not have heroes before OnInit');
      });
    })));

    it('should NOT have heroes immediately after OnInit',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      tcb.createAsync(DashboardComponent).then(fixture => {
        comp = fixture.debugElement.componentInstance;
        fixture.detectChanges(); // runs initial lifecycle hooks

        expect(comp.heroes.length).toEqual(0,
          'should not have heroes until service promise resolves');
      });
    })));

    it('should HAVE heroes after HeroService gets them',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(DashboardComponent).then(fixture => {
        comp = fixture.debugElement.componentInstance;
        fixture.detectChanges();           // runs ngOnInit -> getHeroes

        mockHeroService.lastPromise // the one from getHeroes
          .then(() => {
            expect(comp.heroes.length).toBeGreaterThan(0,
              'should have heroes after service promise resolves');
          });

      });
    })));

    it('should DISPLAY heroes after HeroService gets them',
      async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      tcb.createAsync(DashboardComponent).then(fixture => {
        comp = fixture.debugElement.componentInstance;
        fixture.detectChanges();           // runs ngOnInit -> getHeroes

        mockHeroService.lastPromise // the one from getHeroes
          .then(() => {

            // Find and examine the displayed heroes
            fixture.detectChanges();      // update bindings
            let heroNames = fixture.debugElement.queryAll(By.css('h4'));

            expect(heroNames.length).toEqual(4, 'should display 4 heroes');

            // the 4th displayed hero should be the 5th mock hero
            expect(heroNames[3].nativeElement)
              .toHaveText(mockHeroService.mockHeroes[4].name);
          });

      });
    })));

    it('should tell ROUTER to navigate by hero id',
      async(inject([TestComponentBuilder, Router],
      (tcb: TestComponentBuilder, router: MockRouter) => {

      let spy = spyOn(router, 'navigate').and.callThrough();

      tcb.createAsync(DashboardComponent).then(fixture => {
        let hero: Hero = {id: 42, name: 'Abbracadabra' };
        comp = fixture.debugElement.componentInstance;
        comp.gotoDetail(hero);

        let linkParams = spy.calls.mostRecent().args[0];
        expect(linkParams[0]).toEqual('HeroDetail', 'should nav to "HeroDetail"');
        expect(linkParams[1].id).toEqual(hero.id, 'should nav to fake hero\'s id');

      });
    })));
  });
});
