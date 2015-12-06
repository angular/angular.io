library developer_guide_intro.hero_list_component;

import 'package:angular2/angular2.dart';
import 'package:developer_guide_intro/hero.dart';
import 'package:developer_guide_intro/hero_detail_component.dart';
import 'package:developer_guide_intro/hero_service.dart';

@Component(
    selector: 'hero-list',
    templateUrl: 'hero_list_component.html',
    directives: const [CORE_DIRECTIVES,HeroDetailComponent],
    providers: const [HeroService])
class HeroListComponent {
  List<Hero> heroes;
  Hero selectedHero;

  HeroListComponent(HeroService heroService){
    heroes = heroService.getHeroes();
  }

  selectHero(Hero hero){
    selectedHero = hero;
  }

}
