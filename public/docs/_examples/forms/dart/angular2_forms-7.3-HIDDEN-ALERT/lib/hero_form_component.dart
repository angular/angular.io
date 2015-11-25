// #docregion
library hero_form.hero_form_component;

import 'package:angular2/angular2.dart';
import 'package:hero_form/hero.dart';

const List<String> _powers = const [
  'Really Smart',
  'Super Flexible',
  'Super Hot',
  'Weather Changer'
];

@Component(
    selector: 'hero-form',
    templateUrl: 'hero_form_component.html',
    // #docregion directives
    directives: const [CORE_DIRECTIVES, FORM_DIRECTIVES]
    // #enddocregion directives
    )
class HeroFormComponent {
  List<String> get powers => _powers;
  bool submitted = false;
  Hero model = new Hero(18, 'Dr IQ', _powers[0], 'Chuck Overstreet');

  // TODO: Remove this when we're done
  String get diagnostic => 'DIAGNOSTIC: $model';

  onSubmit() {
    submitted = true;
  }
}
