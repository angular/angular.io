/// <reference path='../_protractor/e2e.d.ts' />
'use strict';

import { addToHeroName, Hero, itHasProperTitleAndHeadings, nameSuffix } from './toh-spec-shared';

describe('Tutorial part 1', () => {

  const expectedHero = { id: 1, name: 'Windstorm' };

  beforeAll(() => browser.get(''));

  itHasProperTitleAndHeadings();

  it(`shows initial hero details`, async () => {
    let page = getPageElts();
    let hero = await Hero.fromDetail(page.heroDetail);
    expect(hero.id).toEqual(expectedHero.id);
    expect(hero.name).toEqual(expectedHero.name);
  });

  it(`can update hero name`, () => {
    addToHeroName(nameSuffix);
    // Nothing specific to expect other than lack of exceptions.
  });

  it(`shows updated hero name`, async () => {
    let page = getPageElts();
    let hero = await Hero.fromDetail(page.heroDetail);
    let newName = expectedHero.name + nameSuffix;
    expect(hero.id).toEqual(expectedHero.id);
    expect(hero.name).toEqual(newName);
  });

});

function getPageElts() {
  return {
    heroDetail: element(by.css('my-app'))
  };
}
