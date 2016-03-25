// #docregion
import 'dart:convert';

import 'package:angular2/core.dart';

class Hero {
  String name;
  Hero(this.name);

  Map toJson() => {'name': name};
}

@Component(
    selector: 'my-hero',
    template: '''
    <div class="hero">
      <p>{{hero.name}} can {{power}}</p>

      <h4>-- Change Log --</h4>
      <div *ngFor="#chg of changeLog">{{chg}}</div>
    </div>
    ''',
    styles: const [
      '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
      'p {background: Yellow; padding: 8px; margin-top: 8px}'
    ])
class MyHeroComponent implements OnChanges {
  @Input() Hero hero;
  @Input() String power;
  @Input() bool reset;
  List<String> changeLog = [];

  ngOnChanges(Map<String, SimpleChange> changes) {
    // Empty the changeLog whenever 'reset' property changes
    // hint: this is a way to respond programmatically to external value changes.
    if (changes.containsKey('reset')) changeLog.clear();

    changes.forEach((String key, SimpleChange change) {
      String cur = JSON.encode(change.currentValue);
      String prev =
          change.isFirstChange() ? "{}" : JSON.encode(change.previousValue);
      changeLog.add('$key: currentValue = ${cur}, previousValue = $prev');
    });
  }
}

@Component(
    selector: 'on-changes-parent',
    template: '''
    <div class="parent">
      <h2>OnChanges</h2>

      <div>Hero.name: <input [(ngModel)]="hero.name"> <i>does NOT trigger onChanges</i></div>
      <div>Power: <input [(ngModel)]="power"> <i>DOES trigger onChanges</i></div>
      <div><button (click)="reset()">Reset Log</button> <i>triggers onChanges and clears the change log</i></div>

      <my-hero [hero]="hero" [power]="power" [reset]="resetTrigger"></my-hero>
    </div>
    ''',
    styles: const [
      '.parent {background: Lavender; padding: 10px; margin:100px 8px;}'
    ],
    directives: const [MyHeroComponent])
class OnChangesParentComponent {
  Hero hero;
  String power;
  bool resetTrigger = false;

  OnChangesParentComponent() {
    reset();
  }

  reset() {
    // new Hero object every time; triggers onChange
    hero = new Hero('Windstorm');
    // setting power only triggers onChange if this value is different
    power = 'sing';
    // always triggers onChange ... which is interpreted as a reset
    resetTrigger = !resetTrigger;
  }
}
