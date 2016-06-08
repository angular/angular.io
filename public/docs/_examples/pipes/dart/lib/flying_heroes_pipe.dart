// #docregion
// #docregion pure
import 'package:angular2/angular2.dart';
import 'heroes.dart';

@Pipe(name: 'flyingHeroes')
class FlyingHeroesPipe extends PipeTransform {
  // #docregion filter
  List<Hero> transform(dynamic value, [List<dynamic> args]) =>
      value.where((hero) => hero.canFly).toList();
  // #enddocregion filter
}
// #enddocregion pure

// Identical except for the pure flag
// #docregion impure, pipe-decorator
@Pipe(name: 'flyingHeroes', pure: false)
// #enddocregion pipe-decorator
class FlyingHeroesImpurePipe extends FlyingHeroesPipe {}
