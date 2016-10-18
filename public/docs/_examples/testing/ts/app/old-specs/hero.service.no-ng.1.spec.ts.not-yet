/*
 * Dev Guide steps to hero.service.no-ng.spec
 * Try it with unit-tests-4.html
 */

// The phase of hero-service-spec
// when we're outlining what we want to test
describe('HeroService (test plan)', () => {

	describe('creation', () => {
		xit('can instantiate the service');
		xit('service.heroes is empty');
	});

  describe('#refresh', () => {

		describe('when server provides heroes', () => {
			xit('refresh promise returns expected # of heroes when fulfilled');
			xit('service.heroes has expected # of heroes when fulfilled');
			xit('service.heroes remains empty until fulfilled');
			xit('service.heroes remains empty when the server returns no data');
			xit('resets service.heroes w/ original data after re-refresh');
			xit('clears service.heroes while waiting for re-refresh');
		});

		describe('when the server fails', () => {
			xit('returns failed promise with the server error');
			xit('clears service.heroes');
		});

	});

});

import {HeroService} from './hero.service';

describe('HeroService (beginning tests - 1)', () => {

	describe('creation', () => {
		it('can instantiate the service', () => {
			let service = new HeroService(null);
			expect(service).toBeDefined();
		});

		it('heroes is empty', () => {
			let service = new HeroService(null);
			expect(service.heroes.length).toEqual(0);
		});

	});

});

import {BackendService} from './backend.service';
import {Hero} from './hero';

xdescribe('HeroService (beginning tests - 2 [dont run])', () => {
	let heroData:Hero[];

	// No good!
	it('refresh promise returns expected # of heroes when fulfilled', () => {
		let service = new HeroService(null);
		service.refresh().then(heroes => {
				expect(heroes.length).toBeGreaterThan(0); // don’t know how many to expect yet
			});
	});

	// better ... but not async!
	it('refresh promise returns expected # of heroes when fulfilled', () => {

		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

		let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
			fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
		};

		let service = new HeroService(backend);
		service.refresh().then(heroes => {
				expect(heroes.length).toEqual(heroData.length); // is it?
				expect(heroes.length).not.toEqual(heroData.length); // or is it not?
				console.log('** inside callback **');
		});

		console.log('** end of test **');
	});

	// better ... but forgot to call done!
	it('refresh promise returns expected # of heroes when fulfilled', done => {

		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

		let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
			fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
		};

		let service = new HeroService(backend);
		service.refresh().then(heroes => {
				expect(heroes.length).toEqual(heroData.length); // is it?
				expect(heroes.length).not.toEqual(heroData.length); // or is it not?
				console.log('** inside callback **');
		});

		console.log('** end of test **');
	});
});

describe('HeroService (beginning tests - 3 [async])', () => {

	let heroData:Hero[];
  // Now it's proper async!
	it('refresh promise returns expected # of heroes when fulfilled', done => {

		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

    let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
      fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
    };

    let service = new HeroService(backend);
    service.refresh().then(heroes => {
        expect(heroes.length).toEqual(heroData.length); // is it?
        //expect(heroes.length).not.toEqual(heroData.length); // or is it not?
				console.log('** inside callback **');
				done();
		});

		console.log('** end of test **');
  });

  // Final before catch
	it('refresh promise returns expected # of heroes when fulfilled', done => {

		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

    let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
      fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
    };

    let service = new HeroService(backend);
    service.refresh().then(heroes => {
        expect(heroes.length).toEqual(heroData.length);
			})
			.then(done);
  });

	// Final before beforeEach refactoring
	it('refresh promise returns expected # of heroes when fulfilled', done => {

		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

    let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
      fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
    };

    let service = new HeroService(backend);
    service.refresh().then(heroes => {
        expect(heroes.length).toEqual(heroData.length);
			})
			.then(done, done.fail);
  });

	it('service.heroes remains empty until fulfilled', () => {
		heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];

    let backend = <BackendService>{
			// return a promise for fake heroes that resolves as quickly as possible
      fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
    };

    let service = new HeroService(backend);
		service.refresh();

		// executed before refresh completes
		expect(service.heroes.length).toEqual(0);
	});
});


describe('HeroService (beginning tests - 4 [beforeEach])', () => {
	let heroData:Hero[];
  let service:HeroService;  // local to describe so tests can see it

	// before beforEach refactoring
  beforeEach(() => {
    heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3,'Baz')];

    let backend = <BackendService> {
      // return a promise for fake heroes that resolves as quickly as possible
      fetchAllHeroesAsync: () => Promise.resolve<Hero[]>(heroData)
    };

    service = new HeroService(backend);
  });

  it('refresh promise returns expected # of heroes when fulfilled', done => {
    service.refresh().then(heroes =>
        expect(heroes.length).toEqual(heroData.length)
      )
      .then(done, done.fail);
  });

  it('service.heroes remains empty until fulfilled', () => {
    service.refresh();

    // executed before refresh completes
    expect(service.heroes.length).toEqual(0);
  });

});

describe('HeroService (beginning tests - 5 [refactored beforeEach])', () => {

	describe('when backend provides data', () => {
		beforeEach(() => {
			heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3,'Baz')];
			service = new HeroService(new HappyBackendService());
		});

		it('refresh promise returns expected # of heroes when fulfilled', done => {
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
