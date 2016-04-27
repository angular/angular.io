// #docregion
import 'package:angular2/core.dart';
import 'dart:convert';

class Hero {
  String name;
  Hero(this.name);
}

@Component(
    selector: 'do-check',
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
class DoCheckComponent implements DoCheck, OnChanges {
  @Input() Hero hero;
  @Input() String power;

  bool changeDetected = false;
  List<String> changeLog = [];
  String oldHeroName = '';
  String oldPower = '';
  int oldLogLength = 0;
  int noChangeCount = 0;

  // #docregion ng-do-check
  ngDoCheck() {
    if (hero.name != oldHeroName) {
      changeDetected = true;
      changeLog.add("DoCheck: Hero name changed to '${hero.name}' from '${oldHeroName}'");
      oldHeroName = hero.name;
    }
    if (power != oldPower) {
      changeDetected = true;
      changeLog.add("DoCheck: Power changed to '${power}' from '${oldPower}'");
      oldPower = power;
    }
    if (changeDetected) {
      noChangeCount = 0;
    } else {
      // log that hook was called when there was no relevant change.
      var count = noChangeCount += 1;
      var noChangeMsg =
          'DoCheck called ${count}x when no change to hero or power';
      if (identical(count, 1)) {
        // add new 'no change' message
        changeLog.add(noChangeMsg);
      } else {
        // update last 'no change' message
        changeLog[changeLog.length - 1] = noChangeMsg;
      }
    }
    changeDetected = false;
  }
  // #enddocregion ng-do-check

  // Copied from OnChangesComponent
  ngOnChanges(Map<String, SimpleChange> changes) {
    changes.forEach((propName, prop) {
      changeLog.add('OnChanges: ${propName}: currentValue = ${prop.currentValue}, previousValue = ${prop.previousValue}');
    });
  }

  reset() {
    changeDetected = true;
    changeLog.length = 0;
  }
}

/***************************************/
@Component(
    selector: 'do-check-parent',
    templateUrl: 'on_changes_parent_component.html',
    styles: const ['.parent {background: Lavender}'],
    directives: const [DoCheckComponent])
class DoCheckParentComponent {
  Hero hero;
  String power;
  var title = 'DoCheck';

  @ViewChild(DoCheckComponent)
  DoCheckComponent childView;

  DoCheckParentComponent() {
    reset();
  }

  reset() {
    hero = new Hero('Windstorm');
    power = 'sing';
    childView?.reset();
  }
}
