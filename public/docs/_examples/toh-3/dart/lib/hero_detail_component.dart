// #docplaster
// #docregion
// #docregion v1
import 'package:angular2/core.dart';
// #enddocregion v1
// #docregion hero-import
import 'hero.dart';
// #enddocregion hero-import

// #docregion v1
@Component(
  selector: 'my-hero-detail',
// #enddocregion v1
  // #docregion template
  template: '''
    <div *ngIf="hero != null">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name">
      </div>
    </div>
  ''',
  // #enddocregion template
  // #docregion inputs
  inputs: const ['hero']
  // #enddocregion inputs
// #docregion v1
)
class HeroDetailComponent {
// #enddocregion v1
// #docregion hero
  Hero hero;
// #enddocregion hero
// #docregion v1
}
// #enddocregion v1
