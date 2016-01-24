//#docregion
//#docregion beforeEach
beforeEachProviders(() => [
  provide(HeroService, {useClass: MockHeroService});
]);
//#enddocregion beforeEach
//#docregion spec
it("should have heroes when created", () => {
  let hc = new HeroesComponent(mockService);
  expect(hc.heroes.length).toEqual(mockService.getHeroes().length);
})
//#enddocregion spec
//#docregion beforeEach-value-provider
  beforeEachProviders(() => {

    let emptyHeroService = { getHeroes: () => [] };

    return [ provide(HeroService, {useValue: emptyHeroService}) ];
  });
//#enddocregion beforeEach-value-provider
//#enddocregion
