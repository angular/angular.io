/* tslint:disable:forin */
// #docregion
import {Component, DoCheck, OnChanges, Input, SimpleChange, ViewChild} from '@angular/core';

class Hero {
  constructor(public name: string) {}
}

@Component({
  selector: 'do-check',
  template: `
  <div class="hero">
    <p>{{hero.name}} can {{power}}</p>

    <h4>-- Change Log --</h4>
    <div *ngFor="let chg of changeLog">{{chg}}</div>
  </div>
  `,
  styles: [
    '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
    'p {background: Yellow; padding: 8px; margin-top: 8px}'
  ]
})
export class DoCheckComponent implements DoCheck, OnChanges {
  @Input() hero: Hero;
  @Input() power: string;

  changeDetected = false;
  changeLog: string[] = [];
  oldHeroName = '';
  oldPower = '';
  oldLogLength = 0;
  noChangeCount = 0;

  // #docregion ng-do-check
  ngDoCheck() {

    if (this.hero.name !== this.oldHeroName) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
      this.oldHeroName = this.hero.name;
    }

    if (this.power !== this.oldPower) {
      this.changeDetected = true;
      this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
      this.oldPower = this.power;
    }

    if (this.changeDetected) {
        this.noChangeCount = 0;
    } else {
        // log that hook was called when there was no relevant change.
        let count = this.noChangeCount += 1;
        let noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
        if (count === 1) {
          // add new "no change" message
          this.changeLog.push(noChangeMsg);
        } else {
          // update last "no change" message
          this.changeLog[this.changeLog.length - 1] = noChangeMsg;
        }
    }

    this.changeDetected = false;
  }
  // #enddocregion ng-do-check

  // Copied from OnChangesComponent
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      let prop = changes[propName];
      let cur  = JSON.stringify(prop.currentValue);
      let prev = JSON.stringify(prop.previousValue);
      this.changeLog.push(`OnChanges: ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  reset() {
    this.changeDetected = true;
    this.changeLog.length = 0;
  }
}

/***************************************/

@Component({
  selector: 'do-check-parent',
  templateUrl: 'app/on-changes-parent.component.html',
  styles: ['.parent {background: Lavender}'],
  directives: [DoCheckComponent]
})
export class DoCheckParentComponent {
  hero: Hero;
  power: string;
  title = 'DoCheck';
  @ViewChild(DoCheckComponent) childView: DoCheckComponent;

  constructor() { this.reset(); }

  reset() {
    this.hero = new Hero('Windstorm');
    this.power = 'sing';
    if (this.childView) { this.childView.reset(); }
  }
}
