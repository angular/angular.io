// #docplaster
// #docregion
// #docregion no-todo
import 'package:angular2/core.dart';

import 'hero.dart';

const List<String> _powers = const [
  'Really Smart',
  'Super Flexible',
  'Super Hot',
  'Weather Changer'
];

@Component(
    selector: 'hero-form',
    templateUrl: 'hero_form_component.html')
class HeroFormComponent {
  List<String> get powers => _powers;
// #docregion submitted
  bool submitted = false;
// #enddocregion submitted
  Hero model = new Hero(18, 'Dr IQ', _powers[0], 'Chuck Overstreet');
// #enddocregion no-todo
  // TODO: Remove this when we're done
  String get diagnostic => 'DIAGNOSTIC: $model';
// #docregion no-todo

// #docregion submitted
  onSubmit() {
    submitted = true;
  }
// #enddocregion submitted
}
