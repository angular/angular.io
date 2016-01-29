// #docplaster
// #docregion
import 'package:angular2/angular2.dart';

import 'hero.dart';

var nextHeroDetailId = 1;

// #docregion input-output-2
@Component(
// #enddocregion input-output-2
    selector: 'hero-detail',
// #docregion input-output-2
    inputs: const ['hero'],
    outputs: const ['deleted'],
// #enddocregion input-output-2
    template: '''
  <div>
    <span [style.text-decoration]="lineThrough" >{{hero?.fullName}}</span>
    <img src="{{heroImageUrl}}" style="height:24px">
    <a (click)="onDelete()">delete</a>
  </div>
'''
// #docregion input-output-2
    )
// #enddocregion input-output-2
class HeroDetailComponent {
  Hero hero = new Hero('Zzzzzzzz'); // default sleeping hero
  String heroImageUrl = 'assets/images/hero.png';
  String lineThrough = ''; // PENDING: use null instead?

  // #docregion deleted
  final EventEmitter deleted = new EventEmitter<Hero>();

  HeroDetailComponent() {
    deleted.listen((Hero _) {
      lineThrough = (lineThrough == '') ? 'line-through' : '';
    });
  }

  onDelete() {
    deleted.emit(hero);
  }
  // #enddocregion deleted
}

@Component(
    selector: 'big-hero-detail',
    /*
  inputs: ['hero'],
  outputs: ['deleted'],
  */
    template: '''
  <div style="border: 1px solid black; padding:3px">
    <img src="{{heroImageUrl}}" style="float:left; margin-right:8px;">
    <div><b>{{hero?.fullName}}</b></div>
    <div>First: {{hero?.firstName}}</div>
    <div>Last: {{hero?.lastName}}</div>
    <div>Birthdate: {{hero?.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero?.url}}" target="_blank">{{hero?.url}}</a></div>
    <div>Rate/hr: {{hero?.rate | currency:'EUR'}}</div>
    <br clear="all">
    <button (click)="onDelete()">Delete</button>
  </div>
''')
class BigHeroDetailComponent extends HeroDetailComponent {
  // #docregion input-output-1
  @Input() Hero hero;
  @Output() final EventEmitter deleted = new EventEmitter<Hero>();
  // #enddocregion input-output-1

  String heroImageUrl = 'assets/images/hero.png';

  onDelete() {
    deleted.emit(hero);
  }
}
