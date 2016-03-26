// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';

@Component(
    selector: 'hero-card',
    template: '''
  <div>
    <span>Name:</span>
    <span>{{hero.name}}</span>
  </div>
  ''')
class HeroCardComponent {
  @Input() Hero hero;
}
// #docregion
