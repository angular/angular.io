// #docregion
import 'package:angular2/angular2.dart';
import 'package:hierarchical_di/hero.dart';

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
