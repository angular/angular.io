// #docregion
import 'package:angular2/core.dart';

import '../logger_service.dart';
import '../user_service.dart';
import 'hero_service.dart';

// #docregion factory
HeroService heroServiceFactory(Logger logger, UserService userService) =>
    new HeroService(logger, userService.user.isAuthorized);
// #enddocregion factory

// #docregion provider
const heroServiceProvider = const Provider(HeroService,
    useFactory: heroServiceFactory,
    deps: const [Logger, UserService]);
// #enddocregion provider
