library template_syntax.hero_detail_component;

import 'package:angular2/angular2.dart';
import 'package:template_syntax/hero.dart';

@Component(selector: 'hero-detail')
@View(
    template: ''' <div style="border: 1px solid black; padding:3px">
    <div><b>Hero Detail: {{hero?.fullName}}</b></div>
    <div>First: {{hero?.firstName}}</div>
    <div>Last: {{hero?.lastName}}</div>
    <div>Birthdate: {{hero?.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero?.url}}" target="_blank">{{hero?.url}}</a></div>
    <div>Rate/hr: {{hero?.rate | currency:'EUR'}}</div>
    <button (click)="onDelete()">Delete</button>
  </div>''')
class HeroDetailComponent {
  @Input()
  Type hero = Hero;

  @Output()
  final EventEmitter deleted = new EventEmitter();

  onDelete() {
    deleted.add(hero);
  }
}
