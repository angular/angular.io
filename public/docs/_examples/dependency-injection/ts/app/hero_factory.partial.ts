// #docregion
// #docregion factory
let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isSpecial);
}
// #enddocregion factory

// #docregion provider-config
let heroServiceDefinition = {
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
};
// #enddocregion provider-config

// #docregion provider-bootstrap
let heroServiceProvider = provide(HeroService, heroServiceDefinition);

bootstrap(AppComponent, [heroServiceProvider, Logger, UserService]);
// #enddocregion provider-bootstrap
// #enddocregion
