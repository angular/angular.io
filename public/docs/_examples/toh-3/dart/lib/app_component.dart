//#docregion
import 'package:angular2/angular2.dart';
// #docregion hero-import
import 'hero.dart';
// #enddocregion hero-import
// #docregion hero-detail-import
import 'hero_detail_component.dart';
// #enddocregion hero-detail-import

@Component(
    selector: 'my-app',
// #docregion hero-detail-template
    template: '''
      <h1>{{title}}</h1>
      <h2>My Heroes</h2>
      <ul class="heroes">
        <li *ngFor="#hero of heroes"
          [class.selected]="hero == selectedHero"
          (click)="onSelect(hero)">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
      </ul>
      <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    ''',
// #enddocregion hero-detail-template
    styles: const [
      '''
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .heroes {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 10em;
      }
      .heroes li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0em;
        height: 1.6em;
        border-radius: 4px;
      }
      .heroes li.selected:hover {
        color: white;
      }
      .heroes li:hover {
        color: #607D8B;
        background-color: #EEE;
        left: .1em;
      }
      .heroes .text {
        position: relative;
        top: -3px;
      }
      .heroes .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0em 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0px 0px 4px;
      }
    '''
    ],
// #docregion directives
    directives: const [
      HeroDetailComponent
    ])
// #enddocregion directives
class AppComponent {
  final String title = 'Tour of Heroes';
  final List<Hero> heroes = mockHeroes;
  Hero selectedHero;

  onSelect(Hero hero) {
    selectedHero = hero;
  }
}

final List<Hero> mockHeroes = [
  new Hero(11, "Mr. Nice"),
  new Hero(12, "Narco"),
  new Hero(13, "Bombasto"),
  new Hero(14, "Celeritas"),
  new Hero(15, "Magneta"),
  new Hero(16, "RubberMan"),
  new Hero(17, "Dynama"),
  new Hero(18, "Dr IQ"),
  new Hero(19, "Magma"),
  new Hero(20, "Tornado")
];
