// #docregion
library template_syntax.hero_detail_component;

import 'package:angular2/angular2.dart';
import 'package:template_syntax/hero.dart';

var nextHeroDetailId = 1;

// #docregion input-output-2
@Component(
// #enddocregion input-output-2
    selector: 'hero-detail',
// #docregion input-output-2
    inputs: const ['hero'],
    outputs: const ['deleted'],
// #enddocregion input-output-2
    template: '''<div id="lh{{hero?.id}}">
    {{hero?.fullName}}
    <img src="{{heroImageUrl}}" style="height:24px">
    <a href="#lh{{hero?.id}}" (click)="onDelete()">delete</a>
  </div>'''
// #docregion input-output-2
    )
// #enddocregion input-output-2
class HeroDetailComponent {
  Hero hero;
  // #docregion deleted

  String heroImageUrl = 'assets/images/hero.png';
  final EventEmitter deleted = new EventEmitter<Hero>();

  onDelete() {
    deleted.add(hero);
  }
// #enddocregion deleted
}

@Component(
    selector: 'big-hero-detail',
    /*
  inputs: ['hero'],
  outputs: ['deleted'],
  */
    template: '''<div style="border: 1px solid black; padding:3px">
    <img src="{{heroImageUrl}}" style="float:left; margin-right:8px;">
    <div><b>{{hero?.fullName}}</b></div>
    <div>First: {{hero?.firstName}}</div>
    <div>Last: {{hero?.lastName}}</div>
    <div>Birthdate: {{hero?.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero?.url}}" target="_blank">{{hero?.url}}</a></div>
    <div>Rate/hr: {{hero?.rate | currency:'EUR'}}</div>
    <br clear="all">
    <button (click)="onDelete()">Delete</button>
  </div>''')
class BigHeroDetailComponent extends HeroDetailComponent {
  // #docregion input-output-1
  @Input() Hero hero;
  @Output()
  final EventEmitter deleted = new EventEmitter<Hero>();
  // #enddocregion input-output-1

  String heroImageUrl = 'assets/images/hero.png';

  onDelete() {
    deleted.add(hero);
  }
}
