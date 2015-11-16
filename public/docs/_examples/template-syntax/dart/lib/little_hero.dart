library template_syntax.littleHero;

import 'package:angular2/angular2.dart';
import 'package:template_syntax/hero.dart';

@Component(selector: 'little-hero')
@View(
    template: '''
<div>{{hero?.fullName}}</div>
''')
class LittleHeroComponent {
  @Input()
  var hero = Hero;
}
