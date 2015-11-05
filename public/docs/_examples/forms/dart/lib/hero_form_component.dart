library hero_form.hero_form_component;

import 'package:angular2/angular2.dart';
import 'package:hero_form/hero.dart';

const List<String> _powers = const [
  'Really Smart',
  'Super Flexible',
  'Super Hot',
  'Weather Changer'
];

@Component(selector: 'hero-form')
@View(
    templateUrl: 'hero_form_component.html',
    directives: const [CORE_DIRECTIVES, FORM_DIRECTIVES])
class HeroFormComponent {
  List<String> get powers => _powers;

  bool submitted = false;

  Hero model = new Hero(18, 'Dr IQ', _powers[0], alterEgo: 'Chuck Overstreet');

  onSubmit() {
    submitted = true;
  }
}
