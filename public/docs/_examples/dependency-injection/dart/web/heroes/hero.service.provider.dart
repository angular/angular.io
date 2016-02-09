// #docregion

import "package:angular2/core.dart";
import "hero.service.dart";
import "../logger.service.dart";
import "../user.service.dart";

// #docregion factory
heroServiceFactory(Logger logger, UserService userService) =>
    new HeroService(logger, userService.user.isAuthorized);
// #enddocregion factory

// #docregion provider
const heroServiceProvider = const Provider(
    HeroService,
    useFactory: heroServiceFactory,
    deps: const [Logger, UserService]);
// #enddocregion provider
