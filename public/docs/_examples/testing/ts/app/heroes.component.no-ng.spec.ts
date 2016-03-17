import {HeroesComponent} from './heroes.component';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {User} from './user';

describe('HeroesComponent (Test Plan)', () => {
  xit('can be created');
  xit('has expected userName');

  describe('#onInit', () => {
    xit('HeroService.refresh not called immediately');
    xit('onInit calls HeroService.refresh');
  });

  describe('#heroes', () => {
    xit('lacks heroes when created');
    xit('has heroes after cache loaded');
    xit('restores heroes after refresh called again');

    xit('binds view to heroes');
  });

  describe('#onSelected', () => {
    xit('no hero is selected by default');
    xit('sets the "currentHero"');
    xit('no hero is selected after onRefresh() called');

    xit('the view of the "currentHero" has the "selected" class (NG2 BUG)');
    xit('the view of a non-selected hero does NOT have the "selected" class');
  });

  describe('#onDelete', () => {
    xit('removes the supplied hero (only) from the list');
    xit('removes the currentHero from the list if no hero argument');
    xit('is harmless if no supplied or current hero');
    xit('is harmless if hero not in list');
    xit('is harmless if the list is empty');
    xit('the new currentHero is the one after the removed hero');
    xit('the new currentHero is the one before the removed hero if none after');

    xit('the list view does not contain the "deleted" currentHero');
  });
});

let hc:HeroesComponent;
let heroData: Hero[]; // fresh heroes for each test
let mockUser: User;
let service: HeroService;

// get the promise from the refresh spy;
// casting required because of inadequate d.ts for Jasmine
let refreshPromise = () => (<any>service.refresh).calls.mostRecent().returnValue;

describe('HeroesComponent (no Angular)', () => {

  beforeEach(()=> {
    heroData = [new Hero(1, 'Foo'), new Hero(2, 'Bar'), new Hero(3, 'Baz')];
    mockUser = new User();
  });

  beforeEach(()=> {
    service = <any> new HappyHeroService();
    hc = new HeroesComponent(service, mockUser)
  });

  it('can be created', () => {
    expect(hc instanceof HeroesComponent).toEqual(true); // proof of life
  });

  it('has expected userName', () => {
    expect(hc.userName).toEqual(mockUser.name);
  });

  describe('#onInit', () => {
    it('HeroService.refresh not called immediately', () => {
      let spy = <jasmine.Spy><any> service.refresh;
      expect(spy.calls.count()).toEqual(0);
    });

    it('onInit calls HeroService.refresh', () => {
      let spy = <jasmine.Spy><any> service.refresh;
      hc.ngOnInit(); // Angular framework calls when it creates the component
      expect(spy.calls.count()).toEqual(1);
    });
  })

  describe('#heroes', () => {

    it('lacks heroes when created', () => {
      let heroes = hc.heroes;
      expect(heroes.length).toEqual(0); // not filled yet
    });

    it('has heroes after cache loaded', done => {
      hc.ngOnInit(); // Angular framework calls when it creates the component

      refreshPromise().then(() => {
          let heroes = hc.heroes; // now the component has heroes to show
          expect(heroes.length).toEqual(heroData.length);
        })
        .then(done, done.fail);
    });

    it('restores heroes after refresh called again', done => {
      hc.ngOnInit(); // component initialization triggers service
      let heroes: Hero[];

      refreshPromise().then(() => {
          heroes = hc.heroes; // now the component has heroes to show
          heroes[0].name = 'Wotan';
          heroes.push(new Hero(33, 'Thor'));
          hc.onRefresh();
        })
        .then(() => {
          heroes = hc.heroes; // get it again (don't reuse old array!)
          expect(heroes[0]).not.toEqual('Wotan'); // change reversed
          expect(heroes.length).toEqual(heroData.length); // orig num of heroes
        })
        .then(done, done.fail);
    });
  });

  describe('#onSelected', () => {

    it('no hero is selected by default', () => {
      expect(hc.currentHero).not.toBeDefined();
    });

    it('sets the "currentHero"', () => {
      hc.onSelect(heroData[1]); // select the second hero
      expect(hc.currentHero).toEqual(heroData[1]);
    });

    it('no hero is selected after onRefresh() called', () => {
      hc.onSelect(heroData[1]); // select the second hero
      hc.onRefresh();
      expect(hc.currentHero).not.toBeDefined();
    });
  });


  describe('#onDelete', () => {

    // Load the heroes asynchronously before each test
    // Getting the async out of the way in the beforeEach
    // means tests can be synchronous
    // Note: could have cheated and simply plugged hc.heroes with fake data
    //       that trick would fail if we reimplemented hc.heroes as a readonly property
    beforeEach(done => {
      hc.ngOnInit(); // Angular framework calls when it creates the component
      refreshPromise().then(done, done.fail);
    });

    it('removes the supplied hero (only) from the list', () => {
      hc.currentHero = heroData[1];
      let hero = heroData[2];
      hc.onDelete(hero);

      expect(hc.heroes).not.toContain(hero);
      expect(hc.heroes).toContain(heroData[1]); // left current in place
      expect(hc.heroes.length).toEqual(heroData.length - 1);
    });

    it('removes the currentHero from the list if no hero argument', () => {
      hc.currentHero = heroData[1];
      hc.onDelete();
      expect(hc.heroes).not.toContain(heroData[1]);
    });

    it('is harmless if no supplied or current hero', () => {
      hc.currentHero = null;
      hc.onDelete();
      expect(hc.heroes.length).toEqual(heroData.length);
    });

    it('is harmless if hero not in list', () => {
      let hero = heroData[1].clone(); // object reference matters, not id
      hc.onDelete(hero);
      expect(hc.heroes.length).toEqual(heroData.length);
    });

    // must go async to get hc to clear its heroes list
    it('is harmless if the list is empty', done => {
      let hero = heroData[1];
      heroData = [];
      hc.onRefresh();
      refreshPromise().then(() => {
        hc.onDelete(hero); // shouldn't fail
      })
      .then(done, done.fail);
    });

    it('the new currentHero is the one after the removed hero', () => {
      hc.currentHero = heroData[1];
      let expectedCurrent = heroData[2];
      hc.onDelete();
      expect(hc.currentHero).toBe(expectedCurrent);
    });

    it('the new currentHero is the one before the removed hero if none after', () => {
      hc.currentHero = heroData[heroData.length - 1]; // last hero
      let expectedCurrent = heroData[heroData.length - 2]; // penultimate hero
      hc.onDelete();
      expect(hc.currentHero).toBe(expectedCurrent);
    });
  });

});


////// Helpers //////

class HappyHeroService {

  constructor() {
    spyOn(this, 'refresh').and.callThrough();
  }

  heroes: Hero[];

  refresh() {
    this.heroes = [];
    // updates cached heroes after one JavaScript cycle
    return new Promise((resolve, reject) => {
      this.heroes.push(...heroData);
      resolve(this.heroes);
    });
  }
}
