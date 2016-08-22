// #docplaster
// #docregion
import 'package:angular2/core.dart';

import 'hero.dart';

// #docregion input-output-2
@Component(
// #enddocregion input-output-2
    selector: 'hero-detail',
// #docregion input-output-2
    // ...
    inputs: const ['hero'],
    outputs: const ['deleteRequest'],
// #enddocregion input-output-2
    styles: const [
      'button { margin-left: 8px} div {margin: 8px 0} img {height:24px}'
    ],
// #docregion template-1
    template: '''
      <div>
        <img src="{{heroImageUrl}}">
        <span [style.text-decoration]="lineThrough">
          {{prefix}} {{hero?.fullName}}
        </span>
        <button (click)="delete()">Delete</button>
      </div>'''
// #enddocregion template-1
// #docregion input-output-2
    )
// #enddocregion input-output-2
class HeroDetailComponent {
  Hero hero = new Hero('Zzzzzzzz'); // default sleeping hero
  String heroImageUrl = 'assets/images/hero.png';
  String lineThrough = ''; // PENDING: use null instead?
  @Input() String prefix = '';

  // #docregion deleteRequest
  // This component make a request but it can't actually delete a hero.
  final deleteRequest = new EventEmitter<Hero>();

  void delete() {
    deleteRequest.emit(hero);
    // #enddocregion deleteRequest
    lineThrough = (lineThrough == '') ? 'line-through' : '';
    // #docregion deleteRequest
  }
  // #enddocregion deleteRequest
}

@Component(
    selector: 'big-hero-detail',
    /*
  inputs: ['hero'],
  outputs: ['deleteRequest'],
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
        <button (click)="delete()">Delete</button>
      </div>''')
class BigHeroDetailComponent extends HeroDetailComponent {
  // #docregion input-output-1
  @Input() Hero hero;
  @Output() final deleteRequest = new EventEmitter<Hero>();
  // #enddocregion input-output-1

  String get heroImageUrl => 'assets/images/hero.png';

  @override void delete() {
    deleteRequest.emit(hero);
  }
}
