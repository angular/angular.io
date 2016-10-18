// Test a service without referencing Angular (no Angular DI)
import {HeroService} from './hero.service';
import {BackendService} from './backend.service';
import {Hero} from './hero';

//////  tests ////////////

describe('HeroService (no-angular)', () => {

  describe('creation', () => {
    it('can instantiate the service', () => {
      let service = new HeroService(null);
      expect(service).toBeDefined();
    });

    it('service.heroes is empty', () => {
      let service = new HeroService(null);
      expect(service.heroes.length).toEqual(0);
    });
  });

  describe('#refresh', () => {

    describe('when backend provides data', () => {

      beforeEach(() => {
        heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];
        service = new HeroService(new HappyBackendService());
      });


      it('refresh promise returns expected # of heroes when fulfilled', done => {
        service.refresh().then(heroes =>
          expect(heroes.length).toEqual(heroData.length)
        )
          .then(done, done.fail);
      });

      it('service.heroes has expected # of heroes when fulfilled', done => {
        service.refresh().then(() =>
          expect(service.heroes.length).toEqual(heroData.length)
        )
          .then(done, done.fail);
      });

      it('service.heroes remains empty until fulfilled', () => {
        service.refresh();

        // executed before refresh completes
        expect(service.heroes.length).toEqual(0);
      });

      it('service.heroes remains empty when the server returns no data', done => {
        heroData = []; // simulate no heroes from the backend

        service.refresh().then(() =>
          expect(service.heroes.length).toEqual(0)
        )
          .then(done, done.fail);
      });

      it('resets service.heroes w/ original data after re-refresh', done => {
        let firstHeroes: Hero[];
        let changedName = 'Gerry Mander';

        service.refresh().then(() => {
          firstHeroes = service.heroes; // remember array reference

          // Changes to cache!  Should disappear after refresh
          service.heroes[0].name = changedName;
          service.heroes.push(new Hero(33, 'Hercules'));
          return service.refresh()
        })
          .then(() => {
            expect(firstHeroes).toBe(service.heroes); // same array
            expect(service.heroes.length).toEqual(heroData.length); // no Hercules
            expect(service.heroes[0].name).not.toEqual(changedName); // reverted name change
          })
          .then(done, done.fail);
      });

      it('clears service.heroes while waiting for re-refresh', done => {
        service.refresh().then(() => {
          service.refresh();
          expect(service.heroes.length).toEqual(0);
        })
          .then(done, done.fail);
      });

      // the paranoid will verify not only that the array lengths are the same
      // but also that the contents are the same.
      it('service.heroes has expected heroes when fulfilled (paranoia)', done => {
        service.refresh().then(() => {
          expect(service.heroes.length).toEqual(heroData.length);
          service.heroes.forEach(h =>
            expect(heroData.some(
              // hero instances are not the same objects but
              // each hero in result matches an original hero by value
              hd => hd.name === h.name && hd.id === h.id)
            )
          );
        })
          .then(done, done.fail);
      });

    });

    describe('when backend throws an error', () => {

      beforeEach(() => {
        service = new HeroService(new FailingBackendService());
      });

      it('returns failed promise with the server error', done => {
        service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(err).toEqual(testError))
          .then(done, done.fail);
      });

      it('clears service.heroes', done => {
        service.refresh()
          .then(() => fail('refresh should have failed'))
          .catch(err => expect(service.heroes.length).toEqual(0))
          .then(done, done.fail);
      });

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
  // force-cast it to <Promise<Hero[]> because of TS typing bug.
  fetchAllHeroesAsync = () =>
    <Promise<Hero[]>><any>Promise.reject(testError);
}
