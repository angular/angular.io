// #docregion
import "package:angular2/core.dart";
import "hero.service.dart";
import "../logger.service.dart";
import "../user.service.dart";

// #docregion factory
var heroServiceFactory = (Logger logger, UserService userService) {
  return new HeroService(logger, userService.user.isAuthorized);
};
// #enddocregion factory

// #docregion provider
heroServiceProvider() => provide(HeroService,
    useFactory: heroServiceFactory, deps: [Logger, UserService]);
// #enddocregion provider
