// Test a service when Angular DI is in play

// Angular 2 Test Bed
import {
  beforeEach, xdescribe, describe, it, xit, // Jasmine wrappers
  beforeEachProviders, inject, injectAsync,
} from 'angular2/testing';

import {bind} from 'angular2/core';

// Service related imports
import {HeroService} from './hero.service';
import {BackendService} from './backend.service';
import {Hero} from './hero';

//////  tests ////////////

describe('HeroService (with angular DI)', () => {

  beforeEachProviders(() => [HeroService]);

  describe('creation', () => {

    beforeEachProviders( () => [bind(BackendService).toValue(null)] );

    it('can instantiate the service',
      inject([HeroService], (service: HeroService) => {
        expect(service).toBeDefined();
      }));

    it('service.heroes is empty',
      inject([HeroService], (service: HeroService) => {
        expect(service.heroes.length).toEqual(0);
      }));
  });

  describe('#refresh', () => {

    describe('when backend provides data', () => {

      beforeEach(() => {
        heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3,'Baz')];
      });

      beforeEachProviders(() =>
        [bind(BackendService).toClass(HappyBackendService)]
      );

      it('refresh promise returns expected # of heroes when fulfilled',
        injectAsync([HeroService], (service: HeroService) => {

          return service.refresh().then(heroes =>
              expect(heroes.length).toEqual(heroData.length)
            );
        }));

      it('service.heroes has expected # of heroes when fulfilled',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh().then(() =>
            expect(service.heroes.length).toEqual(heroData.length)
          );
      }));

      it('service.heroes remains empty until fulfilled',
        inject([HeroService], (service: HeroService) => {

        service.refresh();

        // executed before refresh completes
        expect(service.heroes.length).toEqual(0);
      }));

      it('service.heroes remains empty when the server returns no data',
        injectAsync([HeroService], (service: HeroService) => {

        heroData = []; // simulate no heroes from the backend

        return service.refresh().then(() =>
            expect(service.heroes.length).toEqual(0)
          );
      }));

      it('resets service.heroes w/ original data after re-refresh',
        injectAsync([HeroService], (service: HeroService) => {

        let firstHeroes: Hero[];
        let changedName = 'Gerry Mander';

        return service.refresh().then(heroes => {
            firstHeroes = heroes;  // remember array reference

            // Changes to cache!  Should disappear after refresh
            service.heroes[0].name = changedName;
            service.heroes.push(new Hero(33, 'Hercules'));
            return service.refresh()
          })
          .then(() => {
            expect(firstHeroes).toBe(service.heroes); // same object
            expect(service.heroes.length).toEqual(heroData.length); // no Hercules
            expect(service.heroes[0].name).not.toEqual(changedName); // reverted name change
          });
      }));

      it('clears service.heroes while waiting for re-refresh',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh().then(() => {
            service.refresh();
            expect(service.heroes.length).toEqual(0);
          });
      }));
      // the paranoid will verify not only that the array lengths are the same
      // but also that the contents are the same.
      it('service.heroes has expected heroes when fulfilled (paranoia)',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh().then(() => {
            expect(service.heroes.length).toEqual(heroData.length);
            service.heroes.forEach(h =>
              expect(heroData.some(
                // hero instances are not the same objects but
                // each hero in result matches an original hero by value
                hd => hd.name === h.name && hd.id === h.id)
              )
            );
          });
      }));

    });

    describe('when backend throws an error', () => {

      beforeEachProviders(() =>
        [bind(BackendService).toClass(FailingBackendService)]
      );

      it('returns failed promise with the server error',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(err).toBe(testError));
      }));

      it('resets heroes array to empty',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(service.heroes.length).toEqual(0))
      }));
    });

     describe('when backend throws an error (spy version)', () => {

      beforeEachProviders(() => [BackendService]);

      beforeEach(inject([BackendService], (backend: BackendService) =>
        spyOn(backend, 'fetchAllHeroesAsync').and.callFake(() => Promise.reject(testError)
      )));

      it('returns failed promise with the server error',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(err).toBe(testError));
      }));

      it('resets heroes array to empty',
        injectAsync([HeroService], (service: HeroService) => {

        return service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(service.heroes.length).toEqual(0))
      }));
    });

  });
});
///////// test helpers /////////
var service: HeroService;
var heroData: Hero[];

class HappyBackendService {
  // return a promise for fake heroes that resolves as quickly as possible
  fetchAllHeroesAsync = () =>
    Promise.resolve<Hero[]>(heroData.map(h => h.clone()));
}

var testError = 'BackendService.fetchAllHeroesAsync failed on purpose';

class FailingBackendService {
  // return a promise that fails as quickly as possible
  fetchAllHeroesAsync = () =>
    Promise.reject(testError);
}
