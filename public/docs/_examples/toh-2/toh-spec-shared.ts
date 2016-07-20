/// <reference path='../_protractor/e2e.d.ts' />
'use strict';

import { addToHeroName, expectHeading, Hero, itHasProperTitleAndHeadings, nameSuffix } from '../toh-1/toh-spec-shared';

export function initalPageAndUpdateHeroTests() {
  describe('Initial page', initialPageTests);
  describe('Select hero', selectHeroTests);
  describe('Update hero', updateHeroTests);
}

function initialPageTests() {
  itHasProperTitleAndHeadings();

  const expectedH2 = 'My Heroes';

  it(`has h2 '${expectedH2}'`, () => {
    expectHeading(2, expectedH2);
  });

  it('has the right number of heroes', () => {
    let page = getPageElts();
    expect(page.heroes.count()).toEqual(10);
  });

  it('has no selected hero and no hero details', function () {
    let page = getPageElts();
    expect(page.selected.isPresent()).toBeFalsy('selected hero');
    expect(page.heroDetail.isPresent()).toBeFalsy('no hero detail');
  });
}

const targetHero = { id: 16, name: 'RubberMan' };

function selectHeroTests() {
  it(`selects ${targetHero.name} from hero list`, function () {
    let hero = element(by.cssContainingText('li span.badge', targetHero.id.toString()));
    hero.click();
    // Nothing specific to expect other than lack of exceptions.
  });

  it(`has selected ${targetHero.name}`, function () {
    let page = getPageElts();
    let expectedText = `${targetHero.id} ${targetHero.name}`;
    expect(page.selected.getText()).toBe(expectedText);
  });

  it('shows selected hero details', async () => {
    let page = getPageElts();
    let hero = await Hero.fromDetail(page.heroDetail);
    expect(hero.id).toEqual(targetHero.id);
    expect(hero.name).toEqual(targetHero.name);
  });
}

function updateHeroTests() {
  it(`can update hero name`, () => {
    addToHeroName(nameSuffix);
    // Nothing specific to expect other than lack of exceptions.
  });

  it(`shows updated hero name in details`, async () => {
    let page = getPageElts();
    let hero = await Hero.fromDetail(page.heroDetail);
    let newName = targetHero.name + nameSuffix;
    expect(hero.id).toEqual(targetHero.id);
    expect(hero.name).toEqual(newName);
  });

  it(`shows updated hero name in list`, async () => {
    let page = getPageElts();
    let hero = Hero.fromString(await page.selected.getText());
    let newName = targetHero.name + nameSuffix;
    expect(hero.id).toEqual(targetHero.id);
    expect(hero.name).toEqual(newName);
  });

}

function getPageElts() {
  return {
    heroes: element.all(by.css('my-app li')),
    selected: element(by.css('my-app li.selected')),
    heroDetail: element(by.css('my-app > div, my-app > my-hero-detail > div'))
  };
}
