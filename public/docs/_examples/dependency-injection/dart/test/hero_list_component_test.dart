// A simple test
// More details will be in the testing chapter.
import 'package:angular2/core.dart';
import 'package:dependency_injection/heroes/hero.dart';
import 'package:dependency_injection/heroes/hero_list_component.dart';
import 'package:dependency_injection/heroes/hero_service.dart';
import 'package:test/test.dart';

///////////////////////////////////////
////#docregion spec
List<Hero> expectedHeroes = [
  new Hero()
    ..id = 1
    ..name = 'hero1',
  new Hero()
    ..id = 2
    ..name = 'hero2'
    ..isSecret = true
];

class HeroServiceMock implements HeroService {
  @override
  List<Hero> getHeroes() => expectedHeroes;
}

var mockService = new HeroServiceMock();

void main() {
  test('should have heroes when HeroListComponent created', () {
    var hlc = new HeroListComponent(mockService);
    expect(hlc.heroes.length, expectedHeroes.length);
  });
}
//#enddocregion spec
