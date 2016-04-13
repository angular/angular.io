// #docplaster
// #docregion on-init
import 'package:angular2/core.dart';

// #enddocregion on-init
import 'hero.dart';
import 'hero_detail_component.dart';
// #docregion hero-service-import
import 'hero_service_1.dart';
// #enddocregion hero-service-import

// Testable but never shown
@Component(
    selector: 'my-app',
    template: '''
    <div *ngFor="#hero of heroes" (click)="onSelect(hero)">
      {{hero.name}}
    </div>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    ''',
    directives: const [HeroDetailComponent],
    // #docregion providers
    providers: const [HeroService])
// #enddocregion providers
// #docregion on-init
class AppComponent implements OnInit {
  // #enddocregion on-init
  String title = 'Tour of Heroes';
  // #docregion heroes-prop
  List<Hero> heroes;
  // #enddocregion heroes-prop
  Hero selectedHero;

  // #docregion new-service
  HeroService heroService = new HeroService(); // don't do this
  // #enddocregion new-service
  // #docregion ctor
  final HeroService _heroService;
  AppComponent(this._heroService);
  // #enddocregion ctor
  // #docregion getHeroes
  getHeroes() {
    //#docregion get-heroes
    heroes = _heroService.getHeroes();
    // #enddocregion get-heroes
  }
  // #enddocregion getHeroes

  // #docregion ng-on-init
  // #docregion on-init
  ngOnInit() {
    // #enddocregion on-init
    getHeroes();
    // #docregion on-init
  }
  // #enddocregion on-init
  // #enddocregion ng-on-init

  onSelect(Hero hero) {
    selectedHero = hero;
  }
  // #docregion on-init
}
// #enddocregion on-init
