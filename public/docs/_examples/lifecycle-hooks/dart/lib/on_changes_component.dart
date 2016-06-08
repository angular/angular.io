// #docregion
import 'dart:convert';

import 'package:angular2/core.dart';

class Hero {
  String name;
  Hero(this.name);
  Map<String, dynamic> toJson() => {'name': name};
}

@Component(
    selector: 'on-changes',
    template: '''
    <div class="hero">
      <p>{{hero.name}} can {{power}}</p>

      <h4>-- Change Log --</h4>
      <div *ngFor="let chg of changeLog">{{chg}}</div>
    </div>
    ''',
    styles: const [
      '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
      'p {background: Yellow; padding: 8px; margin-top: 8px}'
    ])
class OnChangesComponent implements OnChanges {
// #docregion inputs
  @Input() Hero hero;
  @Input() String power;
// #enddocregion inputs

  List<String> changeLog = [];

  // #docregion ng-on-changes
  ngOnChanges(Map<String, SimpleChange> changes) {
    changes.forEach((String propName, SimpleChange change) {
      String cur = JSON.encode(change.currentValue);
      String prev =
          change.isFirstChange() ? "{}" : JSON.encode(change.previousValue);
      changeLog.add('$propName: currentValue = $cur, previousValue = $prev');
    });
  }
  // #enddocregion ng-on-changes

  void reset() { changeLog.clear(); }
}

@Component(
    selector: 'on-changes-parent',
    templateUrl: 'on_changes_parent_component.html',
    styles: const ['.parent {background: Lavender}'],
    directives: const [OnChangesComponent])
class OnChangesParentComponent {
  Hero hero;
  String power;
  String title = 'OnChanges';
  @ViewChild(OnChangesComponent) OnChangesComponent childView;

  OnChangesParentComponent() {
    reset();
  }

  void reset() {
    // new Hero object every time; triggers onChange
    hero = new Hero('Windstorm');
    // setting power only triggers onChange if this value is different
    power = 'sing';
    childView?.reset();
  }
}
