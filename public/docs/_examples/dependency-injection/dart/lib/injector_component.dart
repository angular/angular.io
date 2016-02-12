// #docplaster

//#docregion
import 'package:angular2/core.dart';
import 'car/car.dart';
import 'heroes/hero_service.dart';
import 'heroes/hero_service_provider.dart';
import 'logger_service.dart';
import 'package:dependency_injection/heroes/hero.dart';

//#docregion injector
@Component(
    selector: 'my-injectors',
    template: '''
  <h2>Other Injections</h2>
  <div id="car"> {{car.drive()}}</div>
  <div id="hero">{{hero.name}}</div>
  <div id="rodent">{{rodent}}</div>
  ''',
    providers: const [
      Car,
      Engine,
      Tires,
      const Provider(HeroService, useFactory: heroServiceFactory),
      Logger
    ])
class InjectorComponent {
  Injector _injector;

  InjectorComponent(this._injector) {
    car = _injector.get(Car);
    heroService = _injector.get(HeroService);
    hero = heroService.getHeroes()[0];
  }

  Car car;

  //#docregion get-hero-service
  HeroService heroService;

  //#enddocregion get-hero-service
  Hero hero;

  String get rodent {
    var rous = _injector.getOptional(ROUS);
    if (rous != null) {
      throw new Exception('Aaaargh!');
    }
    return "R.O.U.S.'s? I don't think they exist!";
  }
}
//#enddocregion injector

/**
 * R.O.U.S. - Rodents Of Unusual Size
 * // https://www.youtube.com/watch?v=BOv5ZjAOpC8
 */
class ROUS {}
