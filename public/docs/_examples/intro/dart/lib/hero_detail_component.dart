library developer_guide_intro.hero_detail_component;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/hero.dart';

@Component(selector: 'hero-detail', templateUrl: 'hero_detail_component.html')
class HeroDetailComponent {
  @Input()
  Type hero = Hero;
}
