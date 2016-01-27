// #docregion
import 'package:angular2/bootstrap.dart';
import 'package:hierarchical_di/heroes_list_component.dart';
import 'package:hierarchical_di/heroes_service.dart';

void main() {
  bootstrap(HeroesListComponent, [HeroesService]);
}

/* Documentation artifact below
// #docregion bad-alternative
// Don't do this!
bootstrap(HeroesListComponent, [HeroesService, RestoreService])
// #enddocregion bad-alternative
*/
